<script>
    $(document).click(function (event) {
        let eventButton = $(event.target).context; //.text(); // stores button text
        let userCompanies = globalVars.allCompanyDetails.value;
        let userEmail; 

        for(let i of userCompanies) {
            if (i.COMPANY_ID == globalVars.company_id) {
                userEmail = i.EMAIL;
            }
        }
        //console.log("eventButton ", eventButton); // displays button context

        fetch('https://json.geoiplookup.io/') // looking up users ip address
          .then(function (response) {
              return response.json(); // returns response
          })
          .then(function (myJson) {

              let info = {
                  EventDate: new Date(),
                  UserEmail: userEmail,
                  Company: globalVars.company_id,
                  EventButton: eventButton,
                  IPaddress: JSON.stringify(myJson.ip),
                  InfoJSON: ""
              }
              console.log("info ", info);
              //send info

          });
        
    });
</script>