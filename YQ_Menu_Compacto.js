/*globals define*/
define( ["qlik", "jquery", "text!./style.css"], function ( qlik, $, cssContent ) {
  'use strict';
  
  $( "<style>" ).html( cssContent ).appendTo( "head" );
  
  
	window.navigate = function (layout, sectionId, event) {
		event.preventDefault();
		layout.currentSection = sectionId;
		qlik.navigation.gotoSheet(sectionId);
	};
  
  return {
    initialProperties: {
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [],
        qInitialDataFetch: [{
          qWidth: 10,
          qHeight: 50
        }],
      }
    },
    definition: {
      type: "items",
      component: "accordion",
      items: {
        dimensions: {
          uses: "dimensions",
          min: 3,
          max: 3
          
        },
        sorting: {
          uses: "sorting"
        },
        settings: {
          uses: "settings",
          items:{
            naveg_interna:{
              type: "items",
              label: "Navegação Interna no APP",
              items:{
                valor_label_rosca: {
                  type: "boolean",
                  ref: "naveg_interna",
                  label: "Navegação Interna",
                  defaultValue:false,
                }
              }
            },
            tipo_de_menu: {
              type: "string",
              component: "dropdown",
              ref: "tipo_de_menu",
              label: "Tipo de Menu",
              options: [{
                value: "Vertical",
                label: "Vertical"
              }, {
                value: "Horizontal",
                label: "Horizontal"
              }, {
                value: "Circular",
                label: "Circular"
              }],
              defaultValue:"Vertical",
            },
            currentSection: {
				type: "string",
				ref: "currentSection",
				label: "Seção Atual",
				defaultValue: "aaa"
			}
          }
        }
      }
    },
    snapshot: {
      canTakeSnapshot: true
    },
    
    
    paint: function ( $element, layout ) {
      
      var hc = layout.qHyperCube;
      var tipo_menu = '';
      
      if(layout.tipo_de_menu == 'Vertical'){
        tipo_menu = 'YQ_menu_compacto';
      } else if (layout.tipo_de_menu == 'Horizontal'){
        tipo_menu = 'YQ_menu_compacto_Horizontal';
      } else {
        tipo_menu = 'YQ_menu_compacto_Circular';
      }
      
      var  novo_html ="<nav id='"+ tipo_menu +"' class='main-menu'>";
        
      if (layout.tipo_de_menu == 'Circular'){
        novo_html +="<div></div>";
        novo_html +="<div></div>";
        novo_html +="<div></div>";
      }



      // adiciona logo (não está funcionando)
      
      //novo_html += "<img src='https://drive.google.com/uc?export=view&id=1nG1GeJtOTtxbY7pT1qVSRjIf7of5MDnV'/>"
      
      



      // declaração da lista de botões
      novo_html +="<ul>";



      // declaração de cada botão na seguinte estrutura
      /*
        <nav id='YQ_menu_compacto' class='main-menu'>
          <li>
            <a href=`"id_do_botão"`}>
              <i class='fonte_a_ser_selecionada'></i>
              <span class='nav-text'>label_do_botao</span>
            </a>
          </li>
          ... isso para quantos botões estiverem declarados no Qlik
        </nav>
      */
      console.log("currentSection: " + 	layout.currentSection)
	  

      for (var c = 0; c < hc.qDataPages[0].qMatrix.length; c++) {



        var sectionName = hc.qDataPages[0].qMatrix[c][1].qText;
        var sectionId = hc.qDataPages[0].qMatrix[c][2].qText;
		
		
        // verifica se o botão corresponde à seção atual
        var isSelected = layout.currentSection === hc.qDataPages[0].qMatrix[c][2].qText;
        // aplica background diferente se selecionado
        console.log(sectionName + ": " + isSelected)
        var liStyle = isSelected ? "style='background-color: #FF001A;'" : "";



                
		novo_html +="<li " + liStyle + ">";
		novo_html += "<a href='#' onclick='navigate(" + JSON.stringify(layout) + ",\"" + sectionId + "\", event)'>";
		novo_html +="<i class='"+ hc.qDataPages[0].qMatrix[c][0].qText +" fa-2x'></i>";
		novo_html +="<span class='nav-text'>";
		novo_html += sectionName;
		novo_html +="</span>";
		novo_html +="</a>";
		novo_html +="</li>";
        
      }



      novo_html +="</ul>";
      novo_html +="</nav>";
      
      
      if(layout.tipo_de_menu == 'Vertical'){
        /*PARTE VERTICAL*/



        if ( $( "#YQ_menu_compacto" ).length ) { 
          /* elemento existe */ 
          $( "#YQ_menu_compacto" ).remove();
          $('#grid').prepend(novo_html);
        }else{
          $('#grid').prepend(novo_html);
        }





        if($('.qv-mode-edit').length ) { 
          $("#YQ_menu_compacto").addClass("ocultar");
        }else{
          $("#YQ_menu_compacto").removeClass("ocultar");
        }



      } else if (layout.tipo_de_menu == 'Horizontal'){



        /*PARTE HORIZONTAL*/



        if ( $( "#YQ_menu_compacto_Horizontal" ).length ) { 
          /* elemento existe */ 
          $( "#YQ_menu_compacto_Horizontal" ).remove();
          //$('.sheet-title-container').prepend(novo_html);
          $(novo_html).insertBefore( '.sheet-title-container' ); 
        }else{
          //$('.sheet-title-container').prepend(novo_html);
          $(novo_html).insertBefore( '.sheet-title-container' ); 
        }





        if($('.qv-mode-edit').length ) { 
          $("#YQ_menu_compacto_Horizontal").addClass("ocultar");
        }else{
          $("#YQ_menu_compacto_Horizontal").removeClass("ocultar");
        }





      } else {



        /*PARTE CIRCULAR*/



        if ( $( "#YQ_menu_compacto_Circular" ).length ) { 
          /* elemento existe */ 
          $( "#YQ_menu_compacto_Circular" ).remove();
          $('#grid').prepend(novo_html);
        }else{
          $('#grid').prepend(novo_html);
        }





        if($('.qv-mode-edit').length ) { 
          $("#YQ_menu_compacto_Circular").addClass("ocultar");
        }else{
          $("#YQ_menu_compacto_Circular").removeClass("ocultar");
        }
      }
      
      console.log(novo_html);
      
      return qlik.Promise.resolve();
    }
  };
} );
 