document.write('<div id="messages"></div>'),document.write('<div id="waitingPopUp"></div>'),document.write('<div id="kanban_prospects" class="tabs"></div>');var i=null,t=null;if(0<columns.length)for(var a=0;a<columns.length;a++)columns[a].width=150;$(function(){i=ej.DataManager(kanbanData),t=$("#kanban_prospects").ejKanban({enableTotalCount:enableNativeTotalCount,dataSource:i,locale:sfLocale,enableRTL:!1,columns:columns,keyField:"kanban_status",fields:{content:"code_client_nom",primaryKey:"rowid",priority:"priority",tag:prospects_tag,title:"",color:"fk_prospectlevel",imageUrl:"undefined"!=typeof fieldImageUrl&&""!=fieldImageUrl?fieldImageUrl:null,collapsibleCards:{field:"",key:""}},cardSettings:{template:"",colorMapping:colorMapping,externalDropTarget:""},contextMenuSettings:{enable:!0,menuItems:[],customMenuItems:[{text:msgPrintKanbanView,target:ej.Kanban.Target.Header,template:""}]},cardDragStop:function(o){var i=$(o.draggedElement).prop("id"),t=$(o.draggedElement).parent().data("ej-mappingkey"),e=$(o.dropTarget).parent().data("ej-mappingkey"),n=document.URL.split("?")[0],a=columnIDs[e];if(void 0===e||void 0===t||e===t||"PROSPECT_STATUS_UNKNOWN"===e)return o.cancel=!0,$("#kanban_prospects").find(".e-targetclone").remove(),void $("body").css("cursor","default");n=-1===n.indexOf("?")?n+="?":n+="&",n+="id="+i,n+="&newStatusID="+a,n+="&newKeyMapping="+e,n+="&action=cardDrop",n+="&token="+token,$("#waitingPopUp").ejWaitingPopup().data("ejWaitingPopup").show(),$.ajax({url:n,type:"GET",dataType:"html",async:!1,success:function(t,e){try{var n=JSON.parse(t);return token=n.token,$("#input_token").val(token),"OK"===n.status?($(".badge").each(function(t){void 0!==n.data.kanbanHeaderCounts[this.id]&&(this.textContent=n.data.kanbanHeaderCounts[this.id])}),window.setTimeout(function(){$("#"+i).css("border-color","magenta")},100),$.jnotify(n.message),!0):($.jnotify(n.message,"warning",5e3),$("#kanban_projets").find(".e-targetclone").remove(),$("body").css("cursor","default"),!(o.cancel=!0))}catch(t){$.jnotify(t,"error",5e3),o.cancel=!0}},error:function(t,e,n){o.cancel=!0,alert(n)},complete:function(t,e){$("#waitingPopUp").ejWaitingPopup().data("ejWaitingPopup").hide()}})},cardDrop:function(t){},cardClick:function(t){if(!tooltipsActive){var e=i.dataSource.json.length,n=-1,o="";for(a=0;a<e;a++)n=i.dataSource.json[a].rowid,o=i.dataSource.json[a].tooltip_content,$("#prospect-"+n).ejTooltip({content:o}),$(".tooltip-ref-"+n).each(function(t){$(this).text(i.dataSource.json[a].code_client)});tooltipsActive=!0}},contextClick:function(t){"ejMenuClick"!=t.type&&"contextClick"!=t.type||t.text!=msgPrintKanbanView||this.print()},queryCellInfo:function(t){null!=t.data.rowid&&""!=t.data.rowid&&null!=t.data.nom&&""!=t.data.nom&&$(t.card).find("div.e-card_image").wrap('<a href="'+DOL_URL_ROOT+"/societe/"+thirdpartyCard+"?socid="+t.data.rowid+'" title="'+t.data.nom+'" target="_blank"></a>')}}).data("ejKanban"),$("#fk_pays_input_filtre").change(function(){var t=$(this).val(),e=document.URL.split("?")[0];e=-1===e.indexOf("?")?e+="?":e+="&",e+="idpays="+t+"&action=countryChange&token="+token,$("#waitingPopUp").ejWaitingPopup().data("ejWaitingPopup").show(),$.ajax({url:e,type:"GET",dataType:"json",success:function(t,e){console.log(t),token=t.token,$("#input_token").val(token),"OK"==t.status?$("#fk_departement_input_filtre").html(t.data):$("#messages").html(t.message)},error:function(t,e,n){console.log(t),alert(n)},complete:function(t,e){$("#waitingPopUp").ejWaitingPopup().data("ejWaitingPopup").hide()}})})}),window.onerror=function(t,e,n,o,i){return $("#waitingPopUp").ejWaitingPopup().data("ejWaitingPopup").hide(),console.log(t),!1};