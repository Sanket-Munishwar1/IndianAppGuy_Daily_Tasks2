// https://djgurnpwsdoqjscwqbsj.supabase.co/storage/v1/object/public/slidetype%20images/Screenshot%20from%202024-02-16%2023-25-15.png
// const {createAskAIOptions, createAskAIPayload, callOpenAI} = require('./functions')

//I have to call 
async function pros_cons2({ slideTitle, slideDesc, myAccountInfo, userEmail, presentationId, firstSlideNumberToStart, wikipediaSearchSuccess, language, colornfonts, isColorfonts, slide }) {
    try {
        var prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
          a) 'title' – a short, catchy headline summarizing the slide's content within 3-4 words.
  
          b) 'number1' – give a number series wise and a single digit number.
          c) 'number2' – give a number series wise and a single digit number.
          d) 'number3' – give a number series wise and a single digit number.
          e) 'number4' – give a number series wise and a single digit number.
  
          f) 'description1' – string of 4 lines covering specific information or examples relevant to the slide's topic. description1 should me more than 12 words and less than 30 words.
          g) 'description2' – string of 4 lines covering specific information or examples relevant to the slide's topic. description2 should me more than 12 words and less than 30 words.
          h) 'description3' – string of 4 lines covering specific information or examples relevant to the slide's topic. description3 should me more than 12 words and less than 30 words.
          i) 'description4' – string of 4 lines covering specific information or examples relevant to the slide's topic. description3 should me more than 12 words and less than 30 words.`

        const payload = createAskAIPayload(prompt, myAccountInfo['plan']);
        const options = createAskAIOptions(payload);
        var { response, result, tokenUsed, error } = await callOpenAI(options);
        if (error) {
            let counter = 0;
            for (let i = 0; i < 3; i++) {
                var { response1, result1, tokenUsed1, error1 } = await callOpenAI(options);
                if (error1) {
                    // Logger.log(error in OpenAI calling loop ${counter} : ${error1} at procons_bullet);
                    counter++;
                    if (i === 2) {

                        return { "success": false, "message": `error while callingOpenAI ${error1}` };
                    }
                } else {
                    result = result1;
                    tokenUsed = tokenUsed1;
                    break;
                }
            }
        }
        try {
            const parsedJson = JSON.parse(result);
            Logger.log("The JSON is valid.");
            let presentationTitle = parsedJson.title;
            let number1 = parsedJson.number1;
            let number2 = parsedJson.number2;
            let number3 = parsedJson.number3;
            let number4 = parsedJson.number4;
            let description1 = parsedJson.description1;
            let description2 = parsedJson.description2;
            let description3 = parsedJson.description3;
            let description4 = parsedJson.description4;

            if (presentationTitle === undefined || presentationTitle === "" ||
                number1 === undefined || number1 === "" ||
                number2 === undefined || number2 === "" ||
                number3 === undefined || number3 === "" ||
                number4 === undefined || number4 === "" ||
                description1 === undefined || description1 === "" ||
                description2 === undefined || description2 === "" ||
                description3 === undefined || description3 === "" ||
                description4 === undefined || description4 === "") {
                return;
            }
            var customJSON = {
                "title": presentationTitle ? presentationTitle : slideTitle,
                "number1": number1 ? number1 : "",
                "number2": number2 ? number2 : "",
                "number3": number3 ? number3 : "",
                "number4": number4 ? number4 : "",
                "description1": description1 ? description1 : "",
                "description2": description2 ? description2 : "",
                "description3": description3 ? description3 : "",
                "description4": description4 ? description4 : ""
            }
            // Logger.log(result: ${result});
            // Translate the result if not in English
            if (language !== 'en') {
                customJSON = translateResponseBulletPoint(customJSON, language, 'en');
            }
            Logger.log("bullet 3");
            const responseData = await pros_cons2_appScript({
                result: customJSON, firstSlideNumberToStart, wikipediaSearchSuccess, colornfonts, userEmail, isColorfonts, slide
            });
            Logger.log("bullet 5");
            // Update in Tokens in supabase table
            if (presentationId !== undefined || presentationId !== null) {
                await updateTokensInSupabase(userEmail, tokenUsed, presentationId);
            }
            return responseData;
        } catch (error) {
            return await Rendering_pros_cons2({
                slideTitle,
                slideDesc,
                myAccountInfo,
                userEmail,
                firstSlideNumberToStart,
                presentationId,
                wikipediaSearchSuccess,
                language,
                colornfonts,
                isColorfonts
            })
        }
    } catch (error) {

    }
}





async function pros_cons2_appScript({ result, firstSlideNumberToStart, wikipediaSearchSuccess, colornfonts, userEmail, isColorfonts, slide }) {
    // Logger.log(firstSlideNumberToStart: ${firstSlideNumberToStart})
    try {
        //   let presentation = SlidesApp.getActivePresentation();
        //   let slides = presentation.getSlides();
        // //   Logger.log(slides.length: ${slides.length});

        //   let slideIndex = firstSlideNumberToStart;
        //   let slide;

        // // Loop to wait for slide creation (limited attempts to avoid infinite loop)
        // let maxAttempts = 10;
        // for (let attempt = 0; attempt < maxAttempts; attempt++) {
        //   slides = presentation.getSlides();
        //   if (slideIndex < slides.length) {
        //     slide = slides[slideIndex];
        //     break;
        //   }
        //   Utilities.sleep(1000);
        // }

        if (!slide) {
            Logger.log("Failed to create or find the desired slide.");
            return { "success": false, "message": "Failed to create the desired slide." };
        }

        if (isColorfonts) {
            slide.getBackground().setSolidFill(colornfonts.backgroundColor);
        } else {
            slide.getBackground().setSolidFill('#ffffff');
        }

        // *********************************************************************************************************
        // *********************************************************************************************************
        // *********************************************************************************************************

        const title2 = slide.insertTextBox(result.title)
        const titleStyle2 = title2.getText().getTextStyle()
        titleStyle2.setBold(true)
        titleStyle2.setForegroundColor('#000000')
        titleStyle2.setFontSize(24)
        titleStyle2.setFontFamily('Lato')
        title2.setTop(30)
        title2.setLeft(45)
        title2.setWidth(650)

        const circle1 = slide.insertShape(SlidesApp.ShapeType.ELLIPSE)
        circle1.setWidth(25)
        circle1.setHeight(25)
        circle1.setTop(100)
        circle1.setLeft(55)
        circle1.getFill().setSolidFill('#ffffff')
        circle1.getBorder().getLineFill().setSolidFill('#2d11ee')
        circle1.getBorder().setWeight(2);


        const number1 = slide.insertTextBox(result.number1)
        const number1Style = number1.getText().getTextStyle()
        number1Style.setFontSize(14)
        number1Style.setFontFamily('Lato')
        number1Style.setForegroundColor('#2d11ee')
        number1Style.setBold(true)
        number1.setTop(97)
        number1.setLeft(56)
        number1.setWidth(20)

        const circle2 = slide.insertShape(SlidesApp.ShapeType.ELLIPSE)
        circle2.setWidth(25)
        circle2.setHeight(25)
        circle2.setTop(170)
        circle2.setLeft(55)
        circle2.getFill().setSolidFill('#ffffff')
        circle2.getBorder().getLineFill().setSolidFill('#2d11ee')
        circle2.getBorder().setWeight(2);


        const number2 = slide.insertTextBox(result.number2)
        const number2Style = number2.getText().getTextStyle()
        number2Style.setFontSize(14)
        number2Style.setFontFamily('Lato')
        number2Style.setForegroundColor('#2d11ee')
        number2Style.setBold(true)
        number2.setTop(167)
        number2.setLeft(56)
        number2.setWidth(20)

        const circle3 = slide.insertShape(SlidesApp.ShapeType.ELLIPSE)
        circle3.setWidth(25)
        circle3.setHeight(25)
        circle3.setTop(250)
        circle3.setLeft(55)
        circle3.getFill().setSolidFill('#ffffff')
        circle3.getBorder().getLineFill().setSolidFill('#2d11ee')
        circle3.getBorder().setWeight(2);


        const number3 = slide.insertTextBox(result.number3)
        const number3Style = number3.getText().getTextStyle()
        number3Style.setFontSize(14)
        number3Style.setFontFamily('Lato')
        number3Style.setForegroundColor('#2d11ee')
        number3Style.setBold(true)
        number3.setTop(247)
        number3.setLeft(56)
        number3.setWidth(20)

        const circle4 = slide.insertShape(SlidesApp.ShapeType.ELLIPSE)
        circle4.setWidth(25)
        circle4.setHeight(25)
        circle4.setTop(330)
        circle4.setLeft(55)
        circle4.getFill().setSolidFill('#ffffff')
        circle4.getBorder().getLineFill().setSolidFill('#2d11ee')
        circle4.getBorder().setWeight(2);


        const number4 = slide.insertTextBox(result.number4)
        const number4Style = number4.getText().getTextStyle()
        number4Style.setFontSize(14)
        number4Style.setFontFamily('Lato')
        number4Style.setForegroundColor('#2d11ee')
        number4Style.setBold(true)
        number4.setTop(327)
        number4.setLeft(56)
        number4.setWidth(20)

        const description = slide.insertTextBox(result.description1)
        const descStyle = description.getText().getTextStyle()
        description.setTop(90)
        description.setLeft(110)
        description.setWidth(450)
        descStyle.setForegroundColor('#000000')
        descStyle.setFontSize(11)
        descStyle.setFontFamily('Lato')

        const description2 = slide.insertTextBox(result.description2)
        const descStyle2 = description2.getText().getTextStyle()
        description2.setTop(160)
        description2.setLeft(110)
        description2.setWidth(450)
        descStyle2.setForegroundColor('#000000')
        descStyle2.setFontSize(11)
        descStyle2.setFontFamily('Lato')

        const description3 = slide.insertTextBox(result.description3)
        const descStyle3 = description3.getText().getTextStyle()
        description3.setTop(240)
        description3.setLeft(110)
        description3.setWidth(450)
        descStyle3.setForegroundColor('#000000')
        descStyle3.setFontSize(11)
        descStyle3.setFontFamily('Lato')

        const description4 = slide.insertTextBox(result.description4)
        const descStyle4 = description4.getText().getTextStyle()
        description4.setTop(320)
        description4.setLeft(110)
        description4.setWidth(450)
        descStyle4.setForegroundColor('#000000')
        descStyle4.setFontSize(11)
        descStyle4.setFontFamily('Lato')

        // *********************************************************************************************************
        // *********************************************************************************************************
        // *********************************************************************************************************


        if (wikipediaSearchSuccess) {
            addSourceTextToLeft1(slide, "Content Source Wikipedia");
        }

        return { "success": true, "message": success };
    } catch (error) {
        Logger.log({ error: `Error: ${error}` });


        return { "success": false, "message": `Error: ${error}` };
    }
}






async function Rendering_pros_cons2({ slideTitle, slideDesc, myAccountInfo, userEmail, presentationId, firstSlideNumberToStart, wikipediaSearchSuccess, language, colornfonts, isColorfonts, slide }) {
    try {
        var prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
            a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
            b) 'pros' – string array of 3 points, where each point should be a detailed paragraph of 10-12 words maximum, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
            c) 'prosTitle' – string of 2 words covering title of positive or Pros part of information.
          d) 'cons' – string array of 3 points, where each point should be a detailed paragraph of 10-12 words maximum, covering negative or cons part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
          e) 'consTitle' – string of 2 words covering title of negative or cons part of information.
        The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`
        const payload = createAskAIPayload(prompt, myAccountInfo['plan']);
        const options = createAskAIOptions(payload);
        var { response, result, tokenUsed, error } = await callOpenAI(options);
        if (error) {
            let counter = 0;
            for (let i = 0; i < 3; i++) {
                var { response1, result1, tokenUsed1, error1 } = await callOpenAI(options);
                if (error1) {
                    // Logger.log(error in OpenAI calling loop ${counter} : ${error1} at procons_bullet);
                    counter++;
                    if (i === 2) {

                        return { "success": false, "message": `error while callingOpenAI ${error1}` };
                    }
                } else {
                    result = result1;
                    tokenUsed = tokenUsed1;
                    break;
                }
            }
        }
        try {
            const parsedJson = JSON.parse(result);
            Logger.log("The JSON is valid.");
            let presentationTitle = parsedJson.title;
            let prosTitle = parsedJson.prosTitle;
            let consTitle = parsedJson.consTitle;
            let pros1 = parsedJson.pros[0];
            let pros2 = parsedJson.pros[1];
            let pros3 = parsedJson.pros[2];
            let cons1 = parsedJson.cons[0];
            let cons2 = parsedJson.cons[1];
            let cons3 = parsedJson.cons[2];
            if (presentationTitle === undefined || presentationTitle === "" || prosTitle === undefined || prosTitle === "" || consTitle === undefined || consTitle === "" || pros1 === undefined || pros1 === "" || pros2 === undefined || pros2 === "" || pros3 === undefined || pros3 === "" || cons1 === undefined || cons1 === "" || cons2 === undefined || cons2 === "" || cons3 === undefined || cons3 === "") {
                return;
            }
            var customJSON = {
                "title": presentationTitle ? presentationTitle : slideTitle,
                "pros": [
                    pros1 ? pros1 : "",
                    pros2 ? pros2 : "",
                    pros3 ? pros3 : ""
                ],
                "prosTitle": prosTitle ? prosTitle : "",
                "cons": [
                    cons1 ? cons1 : "",
                    cons2 ? cons2 : "",
                    cons3 ? cons3 : ""
                ],
                "consTitle": consTitle ? consTitle : ""
            }
            // Logger.log(result: ${result});
            // Translate the result if not in English
            if (language !== 'en') {
                customJSON = translateResponseBulletPoint(customJSON, language, 'en');
            }
            Logger.log("bullet 3");
            const responseData = await pros_cons2_appScript({
                result: customJSON, firstSlideNumberToStart, wikipediaSearchSuccess, colornfonts, userEmail, isColorfonts, slide
            });
            Logger.log("bullet 5");
            // Update in Tokens in supabase table
            if (presentationId !== undefined || presentationId !== null) {
                await updateTokensInSupabase(userEmail, tokenUsed, presentationId);
            }
            return responseData;
        } catch (error) {
            return;
        }
    } catch (error) {

    }
}

