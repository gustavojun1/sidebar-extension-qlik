/*globals define*/
define( ["qlik", "jquery", "text!./style.css"], function ( qlik, $, cssContent ) {
	'use strict';
	
	$( "<style>" ).html( cssContent ).appendTo( "head" );
	
	
	return {
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 10,
					qHeight: 50
				}]
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
			
			var	novo_html ="<nav id='"+ tipo_menu +"' class='main-menu'>";
				
				if (layout.tipo_de_menu == 'Circular'){
					novo_html +="<div></div>";
					novo_html +="<div></div>";
					novo_html +="<div></div>";
				}
				
				
				novo_html +="<ul>";
				
				
				for (var c = 0; c < hc.qDataPages[0].qMatrix.length; c++) {
					
					
					novo_html +="<li>";
					novo_html +="<a href='"+ hc.qDataPages[0].qMatrix[c][2].qText +"'>";
					novo_html +="<i class='"+ hc.qDataPages[0].qMatrix[c][0].qText +" fa-2x'></i>";
					novo_html +="<span class='nav-text'>";
					novo_html += hc.qDataPages[0].qMatrix[c][1].qText;
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

					//console.log(cApp);
					if(layout.naveg_interna){
						$("#YQ_menu_compacto a").click(function(e){
							e.preventDefault();
							qlik.navigation.gotoSheet($(this).attr('href'));
						})
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

					//console.log(cApp);
					if(layout.naveg_interna){
						$("#YQ_menu_compacto_Horizontal a").click(function(e){
							e.preventDefault();
							qlik.navigation.gotoSheet($(this).attr('href'));
						})
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

					//console.log(cApp);
					if(layout.naveg_interna){
						$("#YQ_menu_compacto_Circular a").click(function(e){
							e.preventDefault();
							qlik.navigation.gotoSheet($(this).attr('href'));
						})
					}


					if($('.qv-mode-edit').length ) { 
						$("#YQ_menu_compacto_Circular").addClass("ocultar");
					}else{
						$("#YQ_menu_compacto_Circular").removeClass("ocultar");
					}
				}
				
				
			
			
			return qlik.Promise.resolve();
		}
	};
} );
