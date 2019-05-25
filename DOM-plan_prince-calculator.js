// START block that handles new payment method calculations and companies
            globalVars.plans =[]; // global variable that will hold all types of plans the user chooses
            globalVars.amountToPay = 0; // global variable holding total to be paid by user
            globalVars.tax = 0;
            globalVars.subtotal = 0;
            globalVars.businessTax = 0;
            globalVars.personalTax = 0;
            globalVars.subBusiness = 0;
            globalVars.subPersonal = 0;
            globalVars.subOther = 0;
            globalVars.otherTax = 0;
            globalVars.companyCount = 0;
            //globalVars.businessCount = 0;
            //globalVars.personalCount = 0;
            document.getElementById('business-plan-counter').addEventListener("change", checkCounter); // event listener for each counterBox click/change
            document.getElementById('personal-plan-counter').addEventListener("change", checkCounter); // event listener for each counterBox click/change
            document.getElementById('other-plan-counter').addEventListener("change", checkCounter); // event listener for each counterBox click/change

            // on counterBox value change
            function checkCounter(t) {
                //try {
                    if (t.target.id == "business-plan-counter") {
                        globalVars.subBusiness = (30.00 * t.target.value); // recalculate total amount to pay
                        globalVars.businessTax = setTax(globalVars.subBusiness);
                        setMax("BUS");
                    }
                    else if(t.target.id == "personal-plan-counter"){
                        globalVars.subPersonal = (5.00 * t.target.value);
                        globalVars.personalTax = setTax(globalVars.subPersonal);
                        setMax("PER");
                    }
                    else { // t.target.id == "other-plan-counter"
                        let valorAcordado = 15.00;
                        globalVars.subOther = (5.00 * t.target.value);
                        globalVars.otherTax = setTax(globalVars.subOther);
                        setMax("Other");
                    }

                    globalVars.tax = globalVars.businessTax + globalVars.personalTax + globalVars.otherTax; //tax;
                    globalVars.subtotal = globalVars.subBusiness + globalVars.subPersonal + globalVars.subOther;
                    globalVars.amountToPay = globalVars.subtotal + globalVars.tax;

                    document.getElementById('subtotal-pago').innerText = "$" + JSON.stringify(globalVars.subtotal);
                    document.getElementById('tax-pago').innerText = "$" + JSON.stringify(globalVars.tax) ; // calculate 4% of full price 
                    document.getElementById('total-pago').innerText = "$" + JSON.stringify(globalVars.amountToPay);   // set html to display total amount to pay

                //} catch (e) {
                //    globalVars.amountToPay = 0;
                //    document.getElementById('total-pago').innerText = "$" + JSON.stringify(globalVars.amountToPay);
                //}

            } // END checkCounter function           

            //Calculate state tax 
            function setTax(planSubtotal) {
                let x = Number(((4 / 100) * planSubtotal).toFixed(2)); // if companyCount == 0, return 0. else return tax 
                console.log("plan tax ", x);
                return x;
            }

            // set max amount of companies allowed per counter
            function setMax(type) {
                let max = Number(document.getElementById('personal-plan-counter').value) + Number(document.getElementById('other-plan-counter').value) + Number(document.getElementById('business-plan-counter').value) ;
                
                if (max == 10 || max > 10) {

                    document.getElementById('business-plan-counter').max = document.getElementById('business-plan-counter').value;
                    document.getElementById('personal-plan-counter').max = document.getElementById('personal-plan-counter').value;
                    document.getElementById('other-plan-counter').max = document.getElementById('other-plan-counter').value;

                    DevExpress.ui.notify('Ha llegado al límite de compañías.');
                }
                else {

                    if (type == "BUS") {
                        document.getElementById('business-plan-counter').max = 10;
                        document.getElementById('personal-plan-counter').max = 10 - max;
                        document.getElementById('other-plan-counter').max = 10 - max;
                    }
                    else if (type == "PER") {
                        document.getElementById('personal-plan-counter').max = 10 ;
                        document.getElementById('business-plan-counter').max = 10 - max;
                        document.getElementById('other-plan-counter').max = 10 - max;
                    }
                    else {
                        document.getElementById('other-plan-counter').max = 10;
                        document.getElementById('business-plan-counter').max = 10 - max;
                        document.getElementById('personal-plan-counter').max = 10 - max;
                    }
                }
            }

            // START function that handles payment plan Checkbox Collection
            $(function () {
                $("#business").dxCheckBox({
                    value: undefined, // for now undefined, eventually will be a ternary that sets to undefined if user doesnt has this plan
                    onValueChanged: function (data) {
                        let businessCounter = document.getElementById('business-plan-counter'); // store business plan counter input for use 

                        if (data.value) { //if checked 
                            businessCounter.readOnly = false;
                            globalVars.plans.push({ "BUS" : 30 }); // set type of plan as object with price 
                        }
                        else { // if unchecked 
                            // reset element values
                            businessCounter.max = 10;
                            businessCounter.value = 0;
                            businessCounter.readOnly = true;
                            // reset global vars
                            globalVars.plans.pop(globalVars.plans[globalVars.plans.indexOf({ "BUS": 30 })]);
                            globalVars.subBusiness = 0;
                            globalVars.businessTax = 0;
                            globalVars.subtotal = globalVars.subPersonal + globalVars.subOther;

                            console.log("uncheck business personal", globalVars.personalTax);
                            console.log("uncheck business other ", globalVars.otherTax);
                            
                            globalVars.tax = globalVars.personalTax + globalVars.otherTax;
                            globalVars.amountToPay = (globalVars.tax + globalVars.subtotal);
                            // reset display values 
                            document.getElementById('subtotal-pago').innerText = "$" + JSON.stringify(globalVars.subtotal);
                            document.getElementById('tax-pago').innerText = "$" + globalVars.tax; 
                            document.getElementById('total-pago').innerText = "$" + JSON.stringify(globalVars.amountToPay);

                            // set other counters to 10 provisionally so a bug doesnt occur(keeps previous max, which could be any random number and gives the counter a wrong limit)
                            document.getElementById('personal-plan-counter').max = 10;
                            document.getElementById('other-plan-counter').max = 10 ;
                        }
                    } // onValueChanged
                });

                $("#personal").dxCheckBox({
                    value: undefined,
                    onValueChanged: function (data) {
                        let personalCounter = document.getElementById('personal-plan-counter'); // store personal plan counter input for use 

                        if (data.value) {
                            personalCounter.readOnly = false;
                            globalVars.plans.push({ "PER": 5 }); // set type of plan as object with price 
                        }
                        else { // if unchecked 
                            personalCounter.readOnly = true;
                            personalCounter.value = 0;
                            personalCounter.max = 10;

                            console.log("uncheck personal other", globalVars.otherTax);
                            console.log("uncheck personal busi", globalVars.businessTax);

                            globalVars.personalTax = 0;
                            globalVars.subPersonal = 0;
                            globalVars.plans.pop(globalVars.plans[globalVars.plans.indexOf({ "PER": 5 })]);
                            globalVars.subtotal = globalVars.subBusiness + globalVars.subOther; 
                            globalVars.tax = globalVars.businessTax + globalVars.otherTax ;
                            globalVars.amountToPay = (globalVars.tax + globalVars.subtotal );

                            document.getElementById('subtotal-pago').innerText = "$" + JSON.stringify(globalVars.subtotal);
                            document.getElementById('tax-pago').innerText = "$" + globalVars.tax;
                            document.getElementById('total-pago').innerText = "$" + JSON.stringify(globalVars.amountToPay);

                            // set other counters to 10 provisionally so a bug doesnt occur(keeps previous max, which could be any random number and gives the counter a wrong limit)
                            document.getElementById('business-plan-counter').max = 10;
                            document.getElementById('other-plan-counter').max = 10;
                        }
                    } // onValueChanged
                });

                $("#other").dxCheckBox({
                    value: undefined,
                    onValueChanged: function (data) {
                        let otherCounter = document.getElementById('other-plan-counter'); // store personal plan counter input for use 

                        if (data.value) { //if checked 
                            otherCounter.readOnly = false;
                            globalVars.plans.push({ "OTHER": 5 }); // set type of plan as object with price 
                        }
                        else { // if unchecked 
                            otherCounter.readOnly = false;
                            otherCounter.value = 0;
                            otherCounter.max = 10;
                            globalVars.plans.pop(globalVars.plans[globalVars.plans.indexOf({ "OTHER": 5 })]);
                            globalVars.subOther = 0;
                            globalVars.otherTax = 0;

                            // set other counters to 10 provisionally so a bug doesnt occur(keeps previous max, which could be any random number and gives the counter a wrong limit)
                            document.getElementById('business-plan-counter').max = 10;
                            document.getElementById('personal-plan-counter').max = 10;
                        }
                    } // onValueChanged
                });
        }); // END function that handles payment plan Checkbox Collection

// START block that handles new payment method calculations and companies