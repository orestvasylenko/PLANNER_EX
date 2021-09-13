({ 
    
    MONTHS : ["January", "February", "March", "April", "May",
          "June", "July", "August", "September", "October", "November", "December"],
    
    SHORTMONTHS : ["JAN", "FEB", "MAR", "APR", "MAY",
          "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    
    getMonth : function(cmp, event, helper) {
        
        let today = new Date();
        let countMonth = today.getMonth();
        let currentYear = today.getFullYear();
    
        let currentDate = { currentYear: currentYear, countMonth: countMonth };
        
        for (let i=0; i<this.MONTHS.length; i++) {
          	if (countMonth == i) {
                currentDate.currentMonth = this.MONTHS[i];
        	}
        }
        
        cmp.set('v.listMonthInYear', this.MONTHS);
        cmp.set('v.currentDate', sessionStorage.getItem('currentDate') ? JSON.parse(sessionStorage.getItem('currentDate')) : currentDate);
        cmp.set('v.mainDate', cmp.get('v.currentDate').currentYear + ' ' + cmp.get('v.currentDate').currentMonth);
	},
    
    getDays : function(cmp, event, helper) {
          let currentDate = cmp.get('v.currentDate');
          let m = currentDate.countMonth;
          let y = currentDate.currentYear;

          let numberOfDaysPerMonth = new Date(y, m  + 1, 0).getDate();
        
          let listDaysInMonth = [];
          let listMonth = [];
        
            for(let i = 0; i < numberOfDaysPerMonth; i++){
                listDaysInMonth.push(i + 1);
            }
        
            let listDays = [];
        	let days = [];
            let columns = [];
        	
            listDaysInMonth.forEach(function(el){
                listDays.push({
                                type: 'text',
                                fieldName: '',
                                label: el,
                    			cellAttributes: { class: { fieldName: el } },
                    			initialWidth: 10
                             })
				days.push(el)
                
    	    }); 
            cmp.set('v.days', days);
        
       	    this.SHORTMONTHS.forEach(function(el){
                listMonth.push({
                                type: 'text',
                                fieldName: '',
                                label: el,
                    			cellAttributes: { class: { fieldName: el } },
                    			initialWidth: 130
                             })
    	    });
        	cmp.set('v.months', listMonth);

            /*
                ! Gear Icon
            */
            listDays.unshift({   
                label: '',
                type: 'button-icon',
                initialWidth: 50,
                name : '',
                fieldName: 'iconType',
                typeAttributes: {
                    	name: "demo",
                    	class: "classDemo",
                        iconName: 'standard:settings',
                    	iconClass:"dark",
                        variant: 'container', 
                        disabled: false,
              			}
            });
            listMonth.unshift({   
                label: '',
                type: 'button-icon',
                initialWidth: 50,
                name : '',
                fieldName: 'iconType',
                typeAttributes: {
                    	name: "demo",
                    	class: "classDemo",
                        iconName: 'standard:settings',
                    	iconClass:"dark",
                        variant: 'container', 
                        disabled: false,
              			}
            });

        	cmp.get('v.switchToDaysAndMonths') ? columns = listDays : columns = listMonth;
            
            if(cmp.get('v.showImp')){
                columns.unshift({
                             type: 'text',
                             fieldName: 'Improvements',
                             label: 'Improvements',
                             initialWidth: 200
                             }) 
            }

            if(cmp.get('v.showTMTitle')){
                columns.unshift({
                             type: 'text',
                             fieldName: 'Title',
                             label: 'Title',
                             initialWidth: 150
                             }) 
            }

            if(cmp.get('v.showProjectNames')){
                columns.unshift({
                             type: 'text',
                             fieldName: 'Projects',
                             label: 'Projects',
                             initialWidth: 150
                             }) 
            }

        	columns.unshift({
                               type: 'text',
                               fieldName: 'End Date',
                               label: 'End Date',
                               initialWidth: 100
                            })
 
        	columns.unshift({
                               type: 'text',
                               fieldName: 'Start Date',
                               label: 'Start Date',
                               initialWidth: 110
                            })
                        
            if (cmp.get('v.showTMStartDate')){
                columns.unshift({
                    type: 'text',
                    fieldName: 'Team Member Start Date',
                    label: 'T.M. Start Date',
                    initialWidth: 120
                })  
            }
                            
            columns.unshift({
                               type: 'text',
                               fieldName: 'Developer',
                               label: 'Developer',
                               initialWidth: 150
                            })

              
        
            cmp.set('v.columns', columns);
            
    },
    
    getSetOfMonth: function(cmp, startDate, endDate){

        let arr = [];

        let year = cmp.get('v.currentDate').currentYear;

        	for(let i = 0; i <= this.MONTHS.length; i++){
                if(moment(year + '-' + i + '-01').isBetween(startDate, endDate, 'month', '[]')){
                    arr.push(i - 1);
                }
        	} 
        

        return arr; 
    },
                  
    drawLine: function(cmp, event, helper, listTeamMembers){
        let days = cmp.get('v.days');
        listTeamMembers.forEach(el => {
            

                if(el._children.length > 0){
                    el._children.forEach(project => {
                        if(cmp.get('v.switchToDaysAndMonths')){
                        	project.drawLine.forEach(day => {
                                if(project.Engagement == 'Full-time'){
                                   project[day] = 'Full';
                                } else if(project.Engagement == 'Half-time'){
                                   project[day] = 'Part';
                                } else if(project.Engagement == 'Hourly'){
                                    project[day] = 'Hourly';
                                 }
                            })
                        } else {
                        	project.Range.forEach(count => {
    							let month = this.SHORTMONTHS[count];
                                if(project.Engagement == 'Full-time'){
                                   project[month] = 'Full';
                                } else if(project.Engagement == 'Half-time') {
                                   project[month] = 'Part';
                                } else if(project.Engagement == 'Hourly') {
                                    project[month] = 'Hourly';
                                 }
                            })
                        }

                    });

                } else {
    				days.forEach(day => {
                        el._children.forEach(elem => {
                            elem[day] = 'Inactive';
                        });
                    });
            	}

                        
                    if(cmp.get('v.switchToDaysAndMonths')){
                    // console.log("test:", el._children)
                        // colourChecker(el._children)
                        // console.log('taks pora vznatu'+el._children);
                        for (const day in el.drawLine) {
                            // if(el.drawLine[day] == 1){
                            //     if(el._children.length < 2 && el._children[0].Engagement === 'Half-time'){
                            //        el[day] = 'Part';
                            //     } else if(el._children.length < 2 && el._children[0].Engagement === 'Full-time'){
                            //        el[day] = 'Full';
                            //     } else if(el._children.length < 2 && el._children[0].Engagement === 'Hourly'){
                            //         el[day] = 'Hourly';
                            //     } else {
                            //         el[day] = colourChecker(el._children[1].Engagement)
                            //     }
                            // } else if(el.drawLine[day] == 2 && el._children[0].Engagement === 'Half-time' && el._children[1].Engagement === 'Half-time'){
                            //     el[day] = 'Full';
                            //  } else if(el.drawLine[day] == 2){
                            //      el[day] = colourChecker(el._children[0].Engagement, el._children[1].Engagement)
                            //     }
                                let daysArray = [];
                                for(const obj of el._children){
                                    if(obj.hasOwnProperty(day)){
                                    daysArray.push(obj)}
                                }
                                if(daysArray.length === 1){
                                    if(daysArray[0].Engagement === 'Full-time'){
                                        el[day]=  'Full'
                                    }
                                    else if(daysArray[0].Engagement === 'Half-time'){
                                        el[day]=  'Part'
                                    }
                                    else{
                                        el[day]=  'Hourly'
                                    }
                                }
                                else if(daysArray.length > 1){
                                    let ccounterHalf =0;
                                    let countFull = 0;
                                    for(const item of daysArray){
                                        if(item.Engagement === 'Full-time'){
                                            countFull ++;
                                        }
                                        else if (item.Engagement === 'Half-time'){
                                            ccounterHalf++;
                                        }
                                    }
                                    if(countFull >0){
                                        el[day] = 'Full'
                                    }else{
                                        if(ccounterHalf >1){
                                            el[day] = 'Full'
                                        }
                                        else{
                                            el[day] = 'Crossed'
                                        }
                                    }
                                }
                                
                                
                            //     let haspropert = {};
                            //     for(let i =1;i<31;i++){
                            //         let objprop = [];
                            //         let keyforprop;
                            //         for(obj of arr){
                            //             if(obj.hasOwnProperty(`${i}`)){
                            //                 objprop.push(obj[`${i}`]);
                            //                 keyforprop = i;
                            //             }
                            //         }
                            //         if(objprop.length!=0){
                            //             haspropert[`${keyforprop}`] = (colourChecker(...objprop));
                            //         }
                            //     }
                            //     console.log(haspropert)
                            }
                    } else {console.log('range',el.Range);            
                        const currentMonth = new Date().getMonth();
                        el.Range.forEach(count => {
                        	let month = this.SHORTMONTHS[count];                     
                            if(currentMonth >= this.SHORTMONTHS.indexOf(month) && cmp.get('v.grayOut')){
                                el[month] = 'Grey';
                            }else{
                                if(el._children.length < 2 && el._children[0].Engagement === 'Half-time'){
                                    el[month] = 'Part';
                                } else if(el._children.length < 2 && el._children[0].Engagement === 'Full-time'){
                                    el[month] = 'Full';
                                } else if(el._children.length < 2 && el._children[0].Engagement === 'Hourly'){
                                    el[month] = 'Hourly';
                                }else{
                                    el[month] = 'Crossed';
                               }
                                
                            }
                        })
                   }                        

            });


            cmp.set('v.data', listTeamMembers);   
    },
                                     
    getMilliseconds  : function(y, m, d){
        let date = new Date(y, m, d);
        return Date.parse(date);  
    },
                        
    drawProjectMembersLine: function (cmp, listProjects){
        
        let currentYear = cmp.get('v.currentDate').currentYear;
        let currentMonth = this.MONTHS.indexOf(cmp.get('v.currentDate').currentMonth) + 1;
        let days = cmp.get('v.days');
        let today = new Date();
        let currentDay = today.getDate();  
        
       
       let arr = []
       if(listProjects.length != 0){
           listProjects.forEach(project => {
               days.forEach(day => {
               let currentDate = currentYear + '-' + currentMonth + '-' + day;
                   if(moment(currentDate).isBetween(project['Start Date'], project['End Date'], undefined, '[]')){
                        arr.push(day);
                    }

                });
				
                days.forEach(day => {
                    let currentDate = currentYear + '-' + currentMonth + '-' + day;

                    if(cmp.get('v.grayOut')) {
                        if(moment(currentDate).isBetween(currentYear + '-' + currentMonth + '-1', currentYear + '-' + currentMonth + '-' + currentDay, undefined, '[]')){
                            arr.push(100 + day);
                        }
                    }
                    
                });
                
           });

           
        }
               
       let counter = {};

       arr.forEach(function(e) {
           if(e >= 100) {
            counter[e-100] = 3;
           } else if(counter[e] < 3 || !counter[e]) { 
                if (!counter[e]) {
                    counter[e] = 1;
                } else if(counter[e] == 1) {
                    counter[e] += 1
                }
            }
       }); 


       return counter;

    },
               
    drawProjectLine: function (cmp, project){
        
       let currentYear = cmp.get('v.currentDate').currentYear;
       let currentMonth = this.MONTHS.indexOf(cmp.get('v.currentDate').currentMonth) + 1;
       let days = cmp.get('v.days');
       
       
       let arr = [];
        
       if(project != null){
           days.forEach(day => {
              let currentDate = currentYear + '-' + currentMonth + '-' + day;
                if(moment(currentDate).isBetween(project['Start_Date__c'], project['End_Date__c'], undefined, '[]')){                 
                   arr.push(day);
                }
           })   
       }
              
       return arr;

    },
                
    setProjectTeamMembers: function (cmp, event, helper, data){
                let listTeamMembers = [];

                for (const [key, listTeamMember] of Object.entries(data)) {
                    

                    if(key == cmp.get('v.OfficeLocation')){
                        listTeamMember.forEach( teamMember => {
                            let children = [];
                            
                            let teamMemberId = '';
                            let teamMemberName = teamMember.Name_and_surname_Team_Member__c;
                            let startRangeValues = new Array();
                            let endRangeValues = new Array();
                            let noProjects = '';
                            const filterValues = cmp.get('v.selectedOptionsList');

                            let imp = '';
                            if(teamMember.hasOwnProperty('Improvements__r')){
                                    teamMember.Improvements__r.forEach(improvement => {
                                    imp += `${improvement.Passed__c},`;
                                })
                                //imp = imp.slice(0, imp.length - 2);
                            }
                            let title = '';
                            if(teamMember.hasOwnProperty('Title__c')){
                                title = teamMember.Title__c;
                            }

                            let projects = '';
                            if(teamMember.hasOwnProperty('Project_Team_Members__r')){
                                teamMember.Project_Team_Members__r.forEach(tm =>{
                                    projects =  `${projects}${tm.Project__r.Name}, `
                                })
                                projects = projects.slice(0, projects.length - 2);
                            }
                            
                            if(teamMember.Project_Team_Members__r){
                                    teamMember.Project_Team_Members__r.forEach( project => {
                                    teamMemberId = project.Team_Member__r.Id;
                                    startRangeValues.push(this.getMilliseconds(new Date(project.Start_Date__c).getFullYear(), new Date(project.Start_Date__c).getMonth(), new Date(project.Start_Date__c).getUTCDate()));
                                    endRangeValues.push(this.getMilliseconds(new Date(project.End_Date__c).getFullYear(), new Date(project.End_Date__c).getMonth(), new Date(project.End_Date__c).getUTCDate()));

                                   

                                   const child = {
                                    "id": project.Id,
                                    "Developer": project.Project__r.Name,
                                    "Engagement": project.Engagement__c,
                                    "drawLine": this.drawProjectLine(cmp, project),
                                    "Start Date": moment(project.Start_Date__c).format('ll'),
                                    "End Date": moment(project.End_Date__c).format('ll'),
                                    "Range": this.getSetOfMonth(cmp, new Date(project.Start_Date__c), new Date(project.End_Date__c)),
                                    "Date": {
                                            startDate: new Date(project.Start_Date__c),
                                            endDate: new Date(project.End_Date__c)
                                        },
                                    }
                                    
                                    
                                    if(filterValues.length === 0){
                                       children.push(child);
                                   }else{
                                    let matches = 0;
                                    filterValues.forEach(value => {
                                        
                                        if(project.Engagement__c === value){
                                            children.push(child);
                                        }                                     
                                    })

                                
                                   }
                                    
                                });
                            }
                            const teamMemberObj = {
                                "id": teamMember.Id,
                                "name": teamMember.Id,
                                "Developer": teamMemberName ? teamMemberName : teamMember.First_Name__c,
                                "_children": children,
                                "Range": this.getSetOfMonth(cmp, new Date(Math.min(...startRangeValues)), new Date(Math.max(...endRangeValues))),
                                "drawLine": this.drawProjectMembersLine(cmp, children),
                                "Start Date": startRangeValues.length > 0 ? moment(Math.min(...startRangeValues)).format('ll') : noProjects,
                                "End Date": endRangeValues.length > 0 ? moment(Math.min(...endRangeValues)).format('ll') : noProjects,
                                "Date":{
                                    startDate: new Date(Math.min(...startRangeValues)),
                                    endDate: new Date(Math.max(...endRangeValues))
                                },
                                "Improvements": imp,
                                "Title": title,
                                "Projects": projects,
                                "Team Member Start Date": teamMember.Start_Date__c
                        }

                        if(filterValues.length === 0){
                            listTeamMembers.push(teamMemberObj);
                        } else{
                            filterValues.forEach(value => {
                                if(teamMemberObj.Title === value){
                                    listTeamMembers.push(teamMemberObj);
                            }
                        })
                    }
                        cmp.set('v.listTeamMembers', listTeamMembers);
                        

                        });
                                                             
           			}
                }

  
                this.drawLine(cmp, event, helper, listTeamMembers)
  
    },

    setData : function(cmp, event, helper) {
        let action = cmp.get("c.getProjectTeamMember");

        action.setParams({
            startDate: cmp.get('v.switchToDaysAndMonths') 
                            ? new Date(cmp.get('v.currentDate').currentYear, cmp.get('v.currentDate').countMonth, 1) 
                            : new Date(cmp.get('v.currentDate').currentYear, 0, 2),
            endDate: cmp.get('v.switchToDaysAndMonths') 
            				? new Date(cmp.get('v.currentDate').currentYear, cmp.get('v.currentDate').countMonth, 29) 
                            : new Date(cmp.get('v.currentDate').currentYear, 11, 31),
            
        });

        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let data = response.getReturnValue();
                this.setProjectTeamMembers(cmp, event, helper, data);
                        
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                
                 if (errors) {
                     console.log("Error message: " + errors);
                     
                } else {
                    console.log("Unknown error");
                } 
                
            }
        });
    
        $A.enqueueAction(action);
    
    },
    
    setColors : function(cmp, event, helper) {
        if(localStorage.length != 0){
            cmp.set('v.fullColor', localStorage.getItem('fullColor'));
            cmp.set('v.partColor', localStorage.getItem('partColor'));
            cmp.set('v.crossedColor', localStorage.getItem('crossedColor'));
            cmp.set('v.hourlyColor', localStorage.getItem('hourlyColor'));
        }
    },
        
    setOptionsMonthOrYear: function(cmp, event, helper) {
        let optionsView = [
                    { id: 1, label: 'Month', selected: true },
                    { id: 2, label: 'Year' }
                ];
        cmp.set('v.optionsView', optionsView);
    },
        
    expandSwitch : function(cmp){

       let tree = cmp.find('treegrid_async');
       let expandSwitcher = cmp.get('v.expandSwitcher');

        if(Array.isArray(tree)){
            tree.forEach(el => {
                if(expandSwitcher){
                 el.expandAll();
                   cmp.set('v.expandSwitcher', false);
               } else {
                   el.collapseAll();
                   cmp.set('v.expandSwitcher', true);
               }
            })
            
        } else {
            if(expandSwitcher){
             tree.expandAll();
               cmp.set('v.expandSwitcher', false);
           } else {
               tree.collapseAll();
               cmp.set('v.expandSwitcher', true);
           }
        }
     },

     setPLValues: function(cmp, event, helper){
        const action = cmp.get("c.getPiklistValues");
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === "SUCCESS"){
                const result = response.getReturnValue();
                const plValues = [];
                const selectedValues = [];
                for (let i = 0; i < result.length; i++) {
                    plValues.push({
                        label: result[i],
                        value: result[i]
                    });
                    selectedValues.push(result[i]);
                }
                cmp.set("v.OptionsList", plValues);
                cmp.set("v.selectedOptionsList", selectedValues);

            }
        });
        $A.enqueueAction(action);
     }
})
