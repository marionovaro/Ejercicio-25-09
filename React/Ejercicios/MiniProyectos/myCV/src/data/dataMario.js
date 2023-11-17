export const CV = {
    mario: {
      name: "Anthony",
      surname: "Edward Stark",
      city: "Avengers Tower / New York",
      email: "tony@starkindustries.com",
      birthDate: "29/05/1970",
      phone: "+34 638 795 464",
      image: "https://i.imgur.com/ZQAkED3.png",
      gitHub: "https://github.com/tonystark",
      aboutMe: [
        {
          info: "🤖 My armor, it was never a distraction or a hobby, it was a cocoon. I am Iron Man.",
        },
        {
          info: "🔩 CEO of Stark Industries.",
        },
        {
          info: "🕶 Genius, billionaire, playboy, philanthropist.",
        },
        {
          info: "🦾 I do have a responsibility to keep my inventions from evil hands – but I have a greater responsibility to oppose that evil any way I can.",
        },
      ],
    },
    education: [
      {
        name: "Master in physics",
        date: "1985",
        where: "MIT",
      },
      {
        name: "Aeronautical Engineering",
        date: "1995",
        where: "ATI Vaughn College",
      },
      {
        name: "Weapons Engineer",
        date: "1998",
        where: "Firearm Collegue, Queens",
      },
    ],
    experience: [
      {
        name: "Consultant",
        date: "01/01/2013 – Nowadays",
        where: "S.H.I.E.L.D",
        description:
          "It builds the helicarriers used by S.H.I.E.L.D. It produces the Quinjets used by the Avengers.",
      },
      {
        name: "CEO",
        date: "01/01/2000 – 28/02/2012",
        where: "Stark Industries",
        description:
          "Manage the company, which is a multi-billion dollar multinational corporation that develops and manufactures advanced weapon and defense technologies. The company manufactures the armor worn by Iron Man and War Machine.",
      },
    ],
    languages: [
      {
        language: "Spanish",
        wrlevel: "Native",
        splevel: "Native",
      },
      {
        language: "Catalan",
        wrlevel: "Native",
        splevel: "Native",
      },
      {
        language: "English",
        wrlevel: "Profficient",
        splevel: "Profficient",
      },
      {
        language: "German",
        wrlevel: "Basic",
        splevel: "Basic",
      },
      
    ],
    habilities: [
      "Robotics",
      "Robot Programming",
      "Physics",
      "Weaponery",
      "Engineer",
      "Money",
      "Dating",
      "Saving the world",
    ],
    hobbies: [
      "🏋🏻‍♂️ Gym",
      "👨🏻‍💻 Coding",
      "✈️ Travelling",
      "🏄🏻‍♂️ Surfing"
    ],
  };

  console.log(CV.mario.aboutMe[0].info)