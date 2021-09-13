({ 

    init: function (cmp, event, helper) { 
        
        if(sessionStorage.getItem('gridExpandedRows') != null){
            let gridExpandedRows = sessionStorage.getItem('gridExpandedRows');
            cmp.set('v.gridExpandedRows', gridExpandedRows.split(','));
        }
        console.log("v.gridExpandedRows"); 
        console.log(cmp.get("v.gridExpandedRows")); 
        
        if (sessionStorage.getItem('expandSwitcher') != null) {
           let expandSwitcher = sessionStorage.getItem('expandSwitcher');
           cmp.set('v.expandSwitcher', !expandSwitcher); 
        }

        helper.getMonth(cmp, event, helper);
        helper.getDays(cmp, event, helper);
        helper.setData(cmp, event, helper);
        helper.setColors(cmp, event, helper);
        helper.setOptionsMonthOrYear(cmp, event, helper);
        helper.setPLValues(cmp, event, helper);
        
                
        if (sessionStorage.getItem('OfficeLocation') != null) {
           let OfficeLocation = sessionStorage.getItem('OfficeLocation');
           cmp.set('v.OfficeLocation', OfficeLocation); 
        } else {
            cmp.set('v.OfficeLocation', 'Mikliosha'); 
        }
        
        
    },
  
    doneRendering: function(cmp, event, helper) {
     
        console.log(cmp.find("treegrid_async"));
        // cmp.find("treegrid_async").set("v.style", " maxColumnWidth = 150;");
        // console.log(v)
        // for( var k in v){
        //     console.log(k)
        //     k.style.whiteSpace = 'initial';
        // }
        // v.forEach(i=> {
        //     console.log(i)
        //     i.style.whiteSpace = 'initial'});

      },
    handleOptionsChange: function (cmp, event, helper) {
        const selectedValues = event.getParam("value");
         
        cmp.set("v.selectedOptionsList", selectedValues);
    },
    
    getSelectedOptions : function(cmp, event, helper){
        //const selectedValues = cmp.get("v.selectedOptionsList");
        helper.setData(cmp, event, helper); 
    },
    
    expandSwitcher: function (cmp, event, helper) {

        if(cmp.get('v.expandSwitcher')){
            let gridExpandedRows = [];
            let data = cmp.get('v.data');
            data.forEach(row => {
                gridExpandedRows.push(row.name);
            });
            sessionStorage.setItem('gridExpandedRows', gridExpandedRows);
        } else {
            sessionStorage.removeItem('gridExpandedRows');
        }
		helper.expandSwitch(cmp, event, helper);
    },
    
    setup: function (cmp, event, helper) {
        let isOpenSetup = cmp.get("v.isOpenSetup");
        if(!isOpenSetup){
            cmp.set("v.isOpenSetup", true);
            let openSetup = cmp.find('openSetup');
            $A.util.removeClass(openSetup, 'hideOpenSetup');
            $A.util.addClass(openSetup, 'showOpenSetup');
        } else {
            cmp.set("v.isOpenSetup", false);
            let openSetup = cmp.find('openSetup');
            $A.util.removeClass(openSetup, 'showOpenSetup');
            $A.util.addClass(openSetup, 'hideOpenSetup');
        }
        
        
       let tabSet = cmp.find('tabSet');
       if(isOpenSetup){
           $A.util.removeClass(tabSet, 'slds-p-top_x-small');
           $A.util.addClass(tabSet, 'slds-p-top_xx-large');

       } else {
           $A.util.removeClass(tabSet, 'slds-p-top_xx-large');
           $A.util.addClass(tabSet, 'slds-p-top_x-small');
       }
        
    },

    handleGrayOut: function (cmp, event, helper){
        const grayOut = !cmp.get('v.grayOut');
        cmp.set('v.grayOut', grayOut);
        helper.setData(cmp, event, helper);  
    },

    showImprovements: function (cmp, event, helper){
        const showImp = !cmp.get('v.showImp')
        cmp.set('v.showImp', showImp);
        helper.getDays(cmp, event, helper); 
    },

    showTMTitle: function (cmp, event, helper){
        const showTMTitle = !cmp.get('v.showTMTitle')
        cmp.set('v.showTMTitle', showTMTitle);
        helper.getDays(cmp, event, helper); 
    },

    showProjectNames: function (cmp, event, helper){
        const showProjectNames = !cmp.get('v.showProjectNames')
        cmp.set('v.showProjectNames', showProjectNames);
        helper.getDays(cmp, event, helper); 
    },

    handleColor: function (cmp, event, helper) {
        var val = event.getParam('value');
        let id = event.getSource().getLocalId();
        localStorage.setItem(id, val);   
    },
    
    handleChange: function (cmp, event, helper) {
        if(cmp.get('v.currentDate')){
           sessionStorage.setItem('currentDate', JSON.stringify(cmp.get('v.currentDate')));
        }
        if(cmp.get('v.OfficeLocation')){
           sessionStorage.setItem('OfficeLocation', cmp.get('v.OfficeLocation'));
        }
        helper.setData(cmp, event, helper);
    },
    
    handleRowAction: function(cmp, event, helper) {
        
        var action = event.getParam('action');
        var row = event.getParam('row');
        
        
        if(row.id.startsWith('a0e')){
            let createRecordEvent = $A.get("e.force:createRecord");
            createRecordEvent.setParams({
                "entityApiName": "Team_Member_Project__c",
                "defaultFieldValues": {
                    "Team_Member__c": row.id
                },
                "navigationLocation" : "RELATED_LIST",
            });
            createRecordEvent.fire();

        } else if(row.id.startsWith('a1U')){
            cmp.set('v.ptmId', row.id);
            cmp.set("v.ptmIsOpen", true);
        }
  	},
    
	goBackInTime: function(cmp, event, helper) {
        let currentDate = cmp.get('v.currentDate');
        if(cmp.get('v.switchToDaysAndMonths')){
            currentDate.countMonth = currentDate.countMonth - 1;
    
            let listMonthInYear = cmp.get('v.listMonthInYear');
    
            for (let i=0; i<listMonthInYear.length; i++) {
                if (currentDate.countMonth == i) {
                   currentDate.currentMonth = listMonthInYear[i];
                } 
            }
            if(currentDate.countMonth == -1){
                   currentDate.countMonth = 11;
                   currentDate.currentMonth = listMonthInYear[11];
                   currentDate.currentYear = currentDate.currentYear - 1;
            }                        
        } else {
            currentDate.currentYear = currentDate.currentYear - 1;
        }

       cmp.set('v.currentDate', currentDate);
       helper.getDays(cmp, event, helper, currentDate);
   },
    
   goToTheFuture: function(cmp, event, helper) {
        let currentDate = cmp.get('v.currentDate');
        if(cmp.get('v.switchToDaysAndMonths')){
            currentDate.countMonth = currentDate.countMonth + 1;
    
            let listMonthInYear = cmp.get('v.listMonthInYear');
    
            for (let i=0; i<listMonthInYear.length; i++) {
                if (currentDate.countMonth == i) {
                   currentDate.currentMonth = listMonthInYear[i];
                }
            }
    
            if(currentDate.countMonth > 11){
                   currentDate.countMonth = 0;
                   currentDate.currentMonth = listMonthInYear[0];
                   currentDate.currentYear = currentDate.currentYear + 1;
            }
        } else {
            currentDate.currentYear = currentDate.currentYear + 1;
        }
       cmp.set('v.currentDate', currentDate);
       helper.getDays(cmp, event, helper, currentDate);
   },
    
   currentDate: function(cmp, event, helper) {
      sessionStorage.removeItem('currentDate')
   	  helper.getMonth(cmp, event, helper);
      helper.getDays(cmp, event, helper);
   },
       
   changedView: function(cmp, event, helper) {
       cmp.set('v.switchToDaysAndMonths', !cmp.get('v.switchToDaysAndMonths'));
       helper.getDays(cmp, event, helper);
       helper.setData(cmp, event, helper);
   },
       
   refresh: function(cmp, event, helper) {
       $A.get('e.force:refreshView').fire();
   },
       
   handleExpandSwitcher: function(cmp, event, helper) {
      let currentValue = event.getParam('value');
      sessionStorage.setItem('expandSwitcher', currentValue);
   },
    
})