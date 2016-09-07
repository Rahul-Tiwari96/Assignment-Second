var age = {};
var catogery = {};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>functon to change in array of object/////////////////////////////
function format(obj) {
  var array = [];
  for (agekey in obj)
  {
    array.push(obj[agekey]);
  }
  return array;
  }
////////////////////////////////////////////////combining all 3 files///////////////////////////

  var fileNames= ["csv/India2011.csv","csv/IndiaSC2011.csv","csv/IndiaST2011.csv"];
  fileReader(fileNames);

  function fileReader(fileNames){
    fileNames.map(function(fileName) {

      var fs=require('fs');
      var data=fs.readFileSync(fileName).toString();
      arrayConversion(data);
      console.log(data);
    });

    age=format(age);

    catogery = format(catogery);

  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////the main condition////////////////////////////
function arrayConversion(text)
{
  var header = [];
  text.split('\n').map(function(line , num)
  {
    if(line!=='')
    {
      var line=line.split(',');
      if(num!=0){

        ageKey=line[5];

        //console.log(data);
        if(line[4] == "Total" )
        {
        if (line[5] != "All ages")
        {
        //For First Age wise Total Literate Population JSON
              line[12] = parseInt(line[12]);
            if(ageKey in age) //variable in Object
              {
                age[ageKey].literatepopulation += line[12];

              }
              else {
                //console.log("Keys are "+ Object.keys(age));
                //console.log("key" + ageKey);
                age[ageKey] = {};
                age[ageKey].ageGroup = ageKey;
                age[ageKey].literatepopulation = line[12];

              }

            }


              //For Second Education Category wise - all India data combined together
              for(index=15;index<44;index+=3)
                      {
                        // console.log(headerLine);
                        var eduCatValue = header[index].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                        var totalValue = parseInt(line[index]);
                        if (eduCatValue in catogery) {
                          catogery[eduCatValue].totalPop += totalValue;
                        }
                        else
                        {
                            catogery[eduCatValue] = {eduCateg: eduCatValue, totalPop:totalValue };

                        }
                      }
    }
  }
      else
      {
        header=line;

      }
    }
  }
);
}


  var fs=require('fs');
  fs.writeFile("JsonFile/ageWise.json",JSON.stringify(age),function(err){if(err) throw err; console.log("save age file");})
  fs.writeFile("JsonFile/eduWise.json",JSON.stringify(catogery),function(err){if(err) throw err; console.log("save edu file");})
