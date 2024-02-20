const Slide9 = (pres) => {
    let slide9 = pres.addSlide();

    let opts = {
        x: "3%",
        y: "3%",
        w: '100%',
        h: 1,
        align: 'Left',
        fontSize: 24,
        color: '000000',
        bold:true,
        fontFace: 'League Spartan'
    };

    slide9.addText(
        'Indian History',
        opts
    );

    slide9.addShape(pres.shapes.LINE, { 
        x: '5%', 
        y: '20%', 
        w: '0', 
        h: 4, 
        line: { color: '000000', width: 1,dashType: 'dot' } 
    });

    slide9.addShape(pres.shapes.OVAL, { x: '4.5%', y: '27%', w: '1%', h: 0.1, line: { color: '0000ff', width: 1 } , fill: { color: '0000ff' } });
    slide9.addShape(pres.shapes.OVAL, { x: '4.5%', y: '52%', w: '1%', h: 0.1, line: { color: '#7d7bec', width: 1 } , fill: { color: '#7d7bec' } });
    slide9.addShape(pres.shapes.OVAL, { x: '4.5%', y: '79%', w: '1%', h: 0.1, line: { color: '#FFFF00', width: 1 } , fill: { color: '#FFFF00' } });
   

    // Horizontal line

    slide9.addShape(pres.shapes.LINE, { 
        x: '4.5%', 
        y: '28%', 
        w: '5%', 
        h: 0, 
        line: { color: '0000ff', width: 2 } 
    });

    slide9.addShape(pres.shapes.LINE, { 
        x: '4.5%', 
        y: '53%', 
        w: '5%', 
        h: 0, 
        line: { color: '#7d7bec', width: 2 } 
    });

    slide9.addShape(pres.shapes.LINE, { 
        x: '4.5%', 
        y: '80%', 
        w: '5%', 
        h: 0, 
        line: { color: '#FFFF00', width: 2 } 
    });


    // Subtitle

    slide9.addText(
        "Technological Advancements",
        { x: "11%", y: "19%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
    )

    slide9.addText(
        "Economic Developments",
        { x: "11%", y: "44%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
    )

    slide9.addText(
        'Cultural Milestones',
        { x: "11%", y: "71%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
    )

    // Info

    slide9.addText(
        "1999 witnessed the rise of internet usage in India, with the launch of new tech companies and increased connectivity, laying the foundation for the digital revolution.",
        { x: "35%", y: "19%", w: '50%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
    )

    slide9.addText(
        "The Indian economy in 1999 experienced growth in various sectors, including IT, telecommunications, and manufacturing, contributing to the country's economic progress.",
        { x: "35%", y: "44%", w: '50%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
    )

    slide9.addText(
        '1999 marked significant cultural events in India, such as the release of iconic Bollywood movies and the celebration of traditional festivals, showcasing the rich cultural heritage of the nation.',
        { x: "35%", y: "71%", w: '50%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
    )

}

export default Slide9