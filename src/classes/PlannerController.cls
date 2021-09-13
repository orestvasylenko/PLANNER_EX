public class PlannerController {
    
    @AuraEnabled
    public static Map<String,  List<Team_Member__c>> getProjectTeamMember(Date startDate, Date endDate){
        
        Map<String, List<Team_Member__c>> mapTMP = new Map<String,  List<Team_Member__c>>();
        
        //Date endDate = date.newInstance(2022, 1, 12);
        //Date startDate = date.newInstance(2020, 1, 12);
        List<Team_Member__c> listTMP = new List<Team_Member__c>();
        listTMP = [SELECT Id, Name, First_Name__c, Last_Name__c, Location__c, Title__c, Start_Date__c, (Select Id, Name, Start_Date__c, End_Date__c, Project__c, Project__r.Name, Team_Member__r.First_Name__c, Team_Member__r.Last_Name__c, Team_Memberf__c, Engagement__c FROM Project_Team_Members__r WHERE Start_Date__c <= :endDate AND End_Date__c >= :startDate), (Select Passed__c FROM Improvements__r) FROM Team_Member__c WHERE Status__c = 'Active Employee'];
    	System.debug('List : ' + listTMP);
        
        if(listTMP.size() != 0){
            for(Team_Member__c item : listTMP){
                if(mapTMP.containsKey(item.Location__c)){
                    List<Team_Member__c> local = mapTMP.get(item.Location__c);
                    local.add(item);
                    mapTMP.put(item.Location__c, local);
                } else {
                    mapTMP.put(item.Location__c, new List<Team_Member__c>{item});
                }    
                
            }
        }

        
        return mapTMP;
    }
    
    @AuraEnabled
    public static Boolean deleteProjectTeamMember(String projectTeamMemberId ){        
        Team_Member_Project__c ptm = new Team_Member_Project__c(Id = projectTeamMemberId);       
        delete ptm;
        return true;
    }

    @AuraEnabled
    public static List <String> getPiklistValues(){        
        List<String> plValues = new List<String>();
        getPiklistValuesHelper('Team_Member__c', 'Title__c', plValues);
        getPiklistValuesHelper('Team_Member_Project__c', 'Engagement__c', plValues);
        return plValues;
    }

    private static void getPiklistValuesHelper(String objectName, String fieldName, List<String> valList){
        Schema.SObjectType objType = Schema.getGlobalDescribe().get(objectName);
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        Schema.DescribeFieldResult objFieldInfo = objDescribe.fields.getMap().get(fieldName).getDescribe();
        List<Schema.PicklistEntry> picklistvalues = objFieldInfo.getPicklistValues();

        for(Schema.PicklistEntry plv: picklistvalues) {
            valList.add(plv.getValue());
        }
    }   
}