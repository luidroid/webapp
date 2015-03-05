/*global Kinetic:false*/
/*global $:false*/
'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('DashboardCtrl', function ($scope,$state,HttpStatus,DashboardService) {
     $scope.componentPercent = 0;
     $scope.componentOptions = {
        barColor:'#2C3E50',
        scaleColor:false,
        lineWidth:10,
        lineCap:'circle'
      }; 

     $scope.routerPercent = 0;
     $scope.routerOptions = {
        barColor: '#F2A200',
        scaleColor:false,
        lineWidth:10,
        lineCap:'circle'
      }; 

      DashboardService.getLabels().then(function(res){
        $scope.translation = res.data;
      },function(error){
          if(error.status === HttpStatus.FORBIDDEN){ 
             goToLoginView();
          }
      });

      DashboardService.getGatewayInfo().then(function(res){
        $scope.gateway = res.data;
      },function(error){
          if(error.status === HttpStatus.FORBIDDEN){
           goToLoginView();
          }
      });

      DashboardService.getUsage().then(function(res){  
         $scope.usage = res.data;   
         $scope.componentPercent = $scope.usage.component.percent; 
         $scope.routerPercent = $scope.usage.router.percent;
      },function(error){
          if(error.status === HttpStatus.FORBIDDEN){
           goToLoginView();
          }
      });

      // Draw wireless network
      DashboardService.getWnetwork().then(function(res){
        $scope.isLoading = true;  
        //console.log('draw wireless network');
        drawNetwork(res.data.network,$state);
      });

      var goToLoginView = function(){
        $state.go('login'); 
      };
  
      //Draw Network
      var drawNetwork = function ( data, uiState ){ console.log(data);
      var offset = 5,
          hDist = 10,
          width = 120,
          height = 70,
          cornerRadius = 5,
          x = hDist + offset,
          y = offset,
          vDist = height + hDist,
          tDist = x,
          lineX,
          lineY,
          line,
          layer,
          stage,
          warningColor = 'red', //'#fcf8e3',
          warningOpacity = 0.6,
          fillColor = '',
          opacity = 1,
          maxTextLength = 16,
          tooltip;

        var drawComponents = function (components){
          lineX = x - hDist;
          lineY =  y + height/2;
          
          line = new Kinetic.Line({
              x: lineX,
              y: lineY,
              points:[0, 0, hDist, 0],
              stroke: 'gray',
              dash: [5, 5]
          });
          layer.add(line);

          $.each(components, function(key,component){

            line = new Kinetic.Line({
                x: lineX,
                y: lineY,
                points:[0, 0, 0, vDist, hDist, vDist],
                stroke: '#4C4C4C',
                dash: [5, 5]
            });
            layer.add(line);
            
            // Checks components with low battery 
            if(component.battery.alarmLowBattery.length > 0){
              fillColor = warningColor;
              opacity = warningOpacity;
            }
            else{
              fillColor = '';
              opacity = 1;
            }
            
            y += vDist;
            var componentRect = new Kinetic.Rect({ 
                  x: x,
                  y: y,
                  width: width,
                  height: height,
                  cornerRadius: cornerRadius,
                  stroke: '#8D97A6',//'#5F9EA0', //cadet blue     
                  fill: fillColor,
                  opacity: opacity
              });
            layer.add(componentRect);
      
            // Component Name
            var text = new Kinetic.Text({
                  x: x + hDist,
                  y: y + offset,
                  fontFamily: 'Calibri',
                  fontSize: 14,
                  text: modifyText(component.name),
                  fill: 'blue'
              });
                    
            text.on('mouseover', function() {
              $('#container').css('cursor', 'pointer');
              this.fontStyle('bold');     
                        
              // Show tooltip if component name is too long
              if(component.name.length > maxTextLength){
                var coord = stage.getPointerPosition();
                  tooltip = new Kinetic.Label({
                      x: coord.x,
                      y: coord.y
                  });
          
                  tooltip.add(new Kinetic.Tag({
                      fill: 'yellow',
                      pointerDirection: 'down',
                      pointerWidth: 10,
                      pointerHeight: 10,
                      lineJoin: 'round'
                  }));
                    
                  tooltip.add(new Kinetic.Text({
                      text: component.name,
                      padding: 5,
                      fill: 'black'
                  }));
                  layer.add(tooltip);
              }
              
                layer.draw();         
              });
            
            text.on('mousedown', function() {
              this.fontStyle('normal');
              layer.draw();
              });
            
            text.on('mouseup', function() {
              this.fontStyle('bold');
              layer.draw();
              });
            
            text.on('mouseout', function() {
              $('#container').css('cursor', 'default');
              this.fontStyle('normal');
              if(tooltip !== undefined){
                tooltip.destroy();
              }
              layer.draw();
              });
            
            text.on('click', function() {
                  uiState.go('components.details', {id: component.id});
              });
            layer.add(text);
                  
            // Component ID
            text = new Kinetic.Text({
                  x: x + hDist,
                  y: y + offset + tDist,
                  fontFamily: 'Calibri',
                  fontStyle: 'bold',
                  text: component.id, //'EUI:',
                  fill: 'black'
              });
            layer.add(text);

            text = new Kinetic.Text({
                  x: x + hDist + 2*tDist,
                  y: y + offset + tDist,
                  fontFamily: 'Calibri',
                  text: '',//component.id,
                  fill: 'black'
              });
            layer.add(text);

            // Component Signal
            text = new Kinetic.Text({
                  x: x + hDist,
                  y: y + offset + 2*tDist,
                  fontFamily: 'Calibri',
                  fontStyle: 'bold',
                  text: 'RSSI:',
                  fill: 'black'
              });
            layer.add(text);

            text = new Kinetic.Text({
                  x: x + hDist + 2*tDist, //+ offset,
                  y: y + offset + 2*tDist,
                  fontFamily: 'Calibri',
                  text: component.signal.strength,
                  fill: 'black'
              });
            layer.add(text);

            // Component Battery
            text = new Kinetic.Text({
                  x: x + hDist,
                  y: y + offset + 3*tDist,
                  fontFamily: 'Calibri',
                  fontStyle: 'bold',
                  text: 'Battery:',
                  fill: 'black'
              });
            layer.add(text);

            text = new Kinetic.Text({
                  x: x + hDist + 3*tDist,
                  y: y + offset + 3*tDist,
                  fontFamily: 'Calibri',
                  text: component.battery.percent,
                  fill: 'black'
              });
            layer.add(text);

            lineY += vDist;

          }); 
        };
        
        // Network container
        var num = data.components !== undefined ? data.components.length : 0;
        stage = new Kinetic.Stage({
          container: 'container',
          width: 720,
          height: 100 + 90*num
        });
        layer = new Kinetic.Layer();

        // Gateway
        var rect = new Kinetic.Rect({
              x: x,
              y: y,
              width: width,
              height: height,
              cornerRadius: cornerRadius,
              strokeWidth: 4,
              stroke: '#003366' // org 'purple'
          });
        layer.add(rect);
      
        // Gateway Name
        var text = new Kinetic.Text({
              x: x + hDist,
              y: y + hDist,
              fontFamily: 'Calibri',
              fontSize: 14,
              text: modifyText(data.name),
              fill: 'blue'
          });
        layer.add(text);

        // Gateway MAC
        text = new Kinetic.Text({
              x: x + hDist,
              y: y + hDist + tDist,
              fontFamily: 'Calibri',
              fontStyle: 'bold',
              text: data.id, //'MAC:',
              fill: 'black'
          });
        layer.add(text);

        text = new Kinetic.Text({
              x: x + hDist + 2*tDist,
              y: y + hDist + tDist,
              fontFamily: 'Calibri',
              text: '',//data.id,
              fill: 'black'
          });
        layer.add(text);

        // Gateway Signal
        text = new Kinetic.Text({
              x: x + hDist,
              y: y + hDist + 2*tDist,
              fontFamily: 'Calibri',
              fontStyle: 'bold',
              text: '',//'Signal:',
              fill: 'black'
          });
        layer.add(text);

        text = new Kinetic.Text({
              x: x + hDist + 2*tDist + offset,
              y: y + hDist + 2*tDist,
              fontFamily: 'Calibri',
              text: data.signal,
              fill: 'black'
          });
        layer.add(text);

        // Components
        if(data.components !== undefined && data.components.length > 0){       
          drawComponents(data.components);
        }

        // Draw Routers with their components
        if(data.routers){
          var dist = x + hDist + width + offset; 
          var rDist = 0;
          $.each(data.routers, function(key,router){
            x += dist;  
            y = height/2 + hDist + offset;
            line = new Kinetic.Line({
                x: x - 3*hDist,
                y: offset + height/2,
                points:[rDist, 0, height+2*hDist, 0, height+2*hDist, hDist],
                stroke: 'gray',
                dash: [5, 5]
            });
            layer.add(line);
            rDist = -width/2;

            //Router
            rect = new Kinetic.Rect({
                  x: x,
                  y: y,
                  width: width,
                  height: height,
                  cornerRadius: cornerRadius,
                  strokeWidth: 4,
                  stroke: '#F2A200'//'orange' 
              });
            layer.add(rect);

            //Router Name
            text = new Kinetic.Text({
                  x: x + hDist,
                  y: y + hDist,
                  fontFamily: 'Calibri',
                  fontSize: 14,
                  text: modifyText(router.name),
                  fill: 'blue'
              });
            layer.add(text);
            
            // Router MAC
            text = new Kinetic.Text({
                  x: x + hDist,
                  y: y + hDist + tDist,
                  fontFamily: 'Calibri',
                  fontStyle: 'bold',
                  text: router.id, //'MAC:'
                  fill: 'black'
              });
            layer.add(text);

            text = new Kinetic.Text({
                  x: x + hDist + 2*tDist,
                  y: y + hDist + tDist,
                  fontFamily: 'Calibri',
                  text: '', //router.id,
                  fill: 'black'
              });
            layer.add(text);

            // Router Signal
            text = new Kinetic.Text({
                  x: x + hDist,
                  y: y + hDist + 2*tDist,
                  fontFamily: 'Calibri',
                  fontStyle: 'bold',
                  text: '', //'Signal:'
                  fill: 'black'
              });
            layer.add(text);

            text = new Kinetic.Text({
                  x: x + hDist + 2*tDist + offset,
                  y: y + hDist + 2*tDist,
                  fontFamily: 'Calibri',
                  text: '', //router.signal,
                  fill: 'black'
              });
            layer.add(text);

            // Components
            if(router.components){        
              drawComponents(router.components);
            }
          }); 
        }
        
        stage.add(layer);

     }; 
    // Modify text it is too long (over 16 characters)
    function modifyText(text){
      var res = text,
          maxTextLength = 16;
      if(text.length > maxTextLength){
        res = text.substring(0,maxTextLength - 3) + '...';
      }
      return res;
    }
      
  });
