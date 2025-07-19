const express = require("express");

const app = express();


let employees = [
        {
        name: "Areeba",
        age: 18,
        phone: "03172502742",
        email: "areba@hztech.biz",
        profession: "Frontend/CMS Developer",
        education: "HSC Part 2 (Continue)",
        experience: [
            {
                company: "HZ Tech",
                position: "Junior Web Developer",
                startDate: "September 2024",
                endDate: "Present",
                responsibilities: [
                    "Worked on advanced functionalities for WordPress and HubSpot websites",
                    "Set up email workflows via Klaviyo and integrated chatbots",
                    "Implemented eCommerce features (discount rules, subscriptions)",
                    "Customized layouts with Divi, WPBakery, Avada, Beaver Builder",
                    "Built dynamic content templates in HubSpot CMS similar to WordPress CPTs"    
                ]
            },
            {
                company: "Gymsol",
                position: "WordPress Developer",
                startDate: "March 2024",
                endDate: "June 2024",
                responsibilities: [
                    "Developed front-end layouts using Divi Theme Builder",
                    "Used Divi Flash for additional features",
                    "Practiced HTML/CSS best practices and implemented basic JavaScript"    
                ]
            }
        ],
        skills: [
            {
                name: "CMS Platforms",
                proficiency: "Expert",
                technologies: ["WordPress", "Hubspot CMS", "SquareSpace", "Shopify"]
            },
            {
                name: "Frontend Development",
                proficiency: "Expert",
                technologies: ["HTML", "CSS", "JavaScript", "TypeScript", "React JS", "Next JS"]
            },
            {
                name: "Backened Development",
                proficiency: "Beginner",
                technologies: ["Node JS", "Databases", "Python", "Agentic AI"]
            }
        ]
    },
    {
        name: "Danish Iqbal",
        age: 28,
        phone: "03173203362",
        email: "danish.iqbal@hztech.biz",
        profession: "Frontend/CMS Developer",
        education: "Intermediate (FC)",
        experience: [
            {
                company: "HZ Tech",
                position: "Senior Web Developer",
                startDate: "September 2019",
                endDate: "Present",
                responsibilities: [
                    "Worked on advanced functionalities for WordPress and HubSpot websites",
                    "Set up email workflows via Klaviyo and integrated chatbots",
                    "Implemented eCommerce features (discount rules, subscriptions)",
                    "Customized layouts with Divi, WPBakery, Avada, Beaver Builder",
                    "Built dynamic content templates in HubSpot CMS similar to WordPress CPTs"    
                ]
            }
        ],
        skills: [
            {
                name: "CMS Platforms",
                proficiency: "Expert",
                technologies: ["WordPress", "Hubspot CMS", "SquareSpace", "Shopify", "WebFlow", "Bubble.io", "Wix"]
            },
            {
                name: "Frontend Development",
                proficiency: "Expert",
                technologies: ["HTML", "CSS", "JavaScript", "Jquery", "PHP"]
            }
        ]
    },
    {
        name: "Rehan Ahmed",
        age: 26,
        phone: "03178568523",
        email: "rehan@hztech.biz",
        profession: "Frontend/CMS Developer",
        education: "BSC",
        experience: [
            {
                company: "HZ Tech",
                position: "Senior Web Developer",
                startDate: "September 2023",
                endDate: "Present",
                responsibilities: [
                    "Worked on advanced functionalities for WordPress and HubSpot websites",
                    "Set up email workflows via Klaviyo and integrated chatbots",
                    "Implemented eCommerce features (discount rules, subscriptions)",
                    "Customized layouts with Divi, WPBakery, Avada, Beaver Builder",
                    "Built dynamic content templates in HubSpot CMS similar to WordPress CPTs"    
                ]
            }
        ],
        skills: [
            {
                name: "CMS Platforms",
                proficiency: "Expert",
                technologies: ["WordPress"]
            }
        ]
    }
];

app.get('/api/employees', (req, res) => {
    res.json(employees);
});


const port = 3774;
app.listen(port, () => {
    console.log("Server started at port: http://localhost:" + port);
})