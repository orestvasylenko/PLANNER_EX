@isTest
public class PlannerControllerTest {
    @isTest
    public static void getProjectTeamMemberTest() {
        
        List<Team_Member__c> listTeamMember = new List<Team_Member__c>();
        
        Team_Member__c TeamMember = new Team_Member__c();
        TeamMember.First_Name__c = 'Test Name';
        TeamMember.Last_Name__c = 'Test Last Name';
        TeamMember.Location__c = 'Mikliosha';
        TeamMember.Birth_Day__c = date.newInstance(1989, 1, 12);
        TeamMember.Company_Email__c = 'testemail@gmail.com';
        TeamMember.Title__c = 'Salesforce Developer';
        TeamMember.Status__c = 'Active Employee';
        TeamMember.Type__c = 'Full-time';
        TeamMember.Level_of_English__c = 'B1 (Intermediate)';
        
        Team_Member__c TeamMember2 = new Team_Member__c();
        TeamMember2.First_Name__c = 'Test Name 2';
        TeamMember2.Last_Name__c = 'Test Last 2';
        TeamMember2.Location__c = 'Mikliosha';
        TeamMember2.Birth_Day__c = date.newInstance(1995, 1, 12);
        TeamMember2.Company_Email__c = 'testemail2@gmail.com';
        TeamMember2.Title__c = 'Salesforce Developer';
        TeamMember2.Status__c = 'Active Employee';
        TeamMember2.Type__c = 'Full-time';
        TeamMember2.Level_of_English__c = 'B1 (Intermediate)';
        
        listTeamMember.add(TeamMember);
        listTeamMember.add(TeamMember2);
        
        insert listTeamMember;
        
        
        Date endDate = date.newInstance(2022, 1, 12);
        Date startDate = date.newInstance(2020, 1, 12);
        //
         Test.startTest();
        
         Map<String,  List<Team_Member__c>> mapTeamMembers = PlannerController.getProjectTeamMember(startDate, endDate);
 
 		 Test.stopTest();
 
 		System.debug('EEEEEEEEEEE : ' + mapTeamMembers.get('Mikliosha')[0].First_Name__c);
        //Team_Member__c:{Id=a0eM000000D86a5IAB, Name=T-370, First_Name__c=Test Name, Last_Name__c=Test Last Name, Location__c=Mikliosha}

 		System.assertEquals('Test Name', mapTeamMembers.get(TeamMember.Location__c)[0].First_Name__c);

    }
    
    @isTest
    public static void deleteProjectTeamMemberTest() {
        
        Team_Member__c TeamMember = new Team_Member__c();
        TeamMember.First_Name__c = 'Test Name';
        TeamMember.Last_Name__c = 'Test Last Name';
        TeamMember.Location__c = 'Mikliosha';
        TeamMember.Birth_Day__c = date.newInstance(1989, 1, 12);
        TeamMember.Company_Email__c = 'testemail@gmail.com';
        TeamMember.Title__c = 'Salesforce Developer';
        TeamMember.Status__c = 'Active Employee';
        TeamMember.Type__c = 'Full-time';
        TeamMember.Level_of_English__c = 'B1 (Intermediate)';
        
        insert TeamMember;
        
        Account account = new Account();
        account.Name = 'Account Test Name';
        
        insert account;
        
        Project__c project = new Project__c();
        project.Name = 'testName';
        project.Status__c = 'Active';
        project.Account__c = account.id;
        project.Starts_On__c = Date.today() - 7;
        project.Ends_On__c = Date.today() + 7;
        
        insert project;
        
        Team_Member_Project__c ptm = new Team_Member_Project__c();
        ptm.Team_Member__c = TeamMember.Id;
        ptm.Project__c = project.id;
        ptm.Start_Date__c = Date.today() - 6;
        ptm.End_Date__c = Date.today() + 6;
        ptm.Engagement__c = 'Full-time';
        
        insert ptm;
        
        Test.startTest();
        
        Boolean result = PlannerController.deleteProjectTeamMember(ptm.id);
 
 		Test.stopTest();
 
        System.assertEquals(true, result);
        
    }

    @isTest
    public static void getPiklistValuesTest() {      
        List<String> plValues =  PlannerController.getPiklistValues();
        System.assertNotEquals(0, plValues.size());
    }
}