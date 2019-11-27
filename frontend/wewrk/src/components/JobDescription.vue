<template>
  <div class="areaContainer">
    <div class="container jobDescriptionContainer">
      <div class="row">
        <div class="col-8 jobTitle">{{jobTitle}}</div>
        <div class="offset-md-2 col-md-2">Apply Button</div>
      </div>
      <div class="row companyName">{{companyName}}</div>
      <div class="bulletPoints row">
        <ul class="bullets col-md-3">
          <li>{{location}}</li>
          <li>{{jobLevel}}</li>
        </ul>
        <ul class="bullets col-md-3">
          <li>{{jobType}}</li>
          <li>{{salary}}</li>
        </ul>
      </div>
      <h3 class="jobDescriptionHeader">Job Description</h3>
      <div v-html="jobDescription" class="jobDescriptionHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobTitle: "Front End Web Developer",
      companyName: "Stet Solutions Inc.",
      location: "Edmonton, AB",
      jobLevel: "Senior Level",
      jobType: "Full Time",
      salary: "$27.75/hr",
      postedDate: "10/29/2019",
      closingDate: "11/30/2019",
      jobDescription:
        // 'Bachelor&apos;s degree <br> 1 year to less than 2 years <br> <ul><h2 class="jobSectionHeader"><b>Specific Skills</b></h2><li> Research and evaluate a variety of interactive media software products</li><li> Consult with clients to develop and document Website requirements</li><li> Source, select and organize information for inclusion and design the appearance, layout and flow of the Website</li><li> Create and optimize content for Website using a variety of graphics, database, animation and other software</li><li> Develop Website architecture and determine hardware and software requirements</li><li> Plan, design, write, modify, integrate and test Web-site related code</li><h2 class="jobSectionHeader"><b> Work Conditions and Physical Capabilities</b></h2><li> Work under pressure</li><li> Attention to detail</li><li> Ability to distinguish between colours</li><li> Sitting</li><h2 class="jobSectionHeader"><b> Computer and Technology Knowledge</b></h2><li> Internet</li><li> File management software</li><li> Presentation software</li><li> Communication software</li><li> Programming software</li><li> Web service design</li><li> Desktop publishing software</li><li> Software development</li><li> Website creation and management software</li><li> MS Office</li><li> Desktop applications</li><li> Multimedia software</li></ul>'
        "<p>Do you have what it takes to be an <b>Air Traffic Controller? </b>We are presently looking for the best possible candidates to take on the responsibility of managing Canada&#x2019;s airspace. Our <b>Air Traffic Controllers</b>help pilots keep aircraft safely separated from other aircraft and obstacles, while in flight or on the ground. They are responsible for coordinating the safe, efficient and orderly flow of air traffic in seven flight information regions, working in Control Towers and Area Control Centres (ACCs) across the country.</p><p><b>Air Traffic Controller</b>training is set to begin in Fall 2020. As an <b>Air Traffic Controller</b>, you can earn up to $151,000 base salary per year plus competitive premiums once qualified. NAV CANADA provides all the necessary training, which lasts between 10 to 27 months depending on the career stream. You will earn $44,000 per year during the training period.</p><p><b>Do exciting work that makes a difference</b></p><p>With NAV CANADA, you can train for one of two rewarding careers:</p><ul><li>Area Controllers, also known as instrument flight rules (IFR) controllers, are based out of Area Control Centres (ACCs). ACCs are responsible for air traffic in a large section of Canadian airspace.</li><li>Tower Controllers, also known as visual flight rules (VFR) controllers, have a direct view of the airport and aircraft, and use radio communication to issue instructions and clearances. They work in control towers at airports.</li></ul><p><b>To apply, you must meet the following basic requirements*: </b></p><ul><li>18 years or older</li><li>high school diploma (or equivalency)</li><li>Canadian citizen or permanent resident</li></ul><p>In addition, you must be willing to relocate, must meet medical requirements, be prepared to undergo a security check, drug testing, and be available for training in Winnipeg for the next 18 months.</p><p><b>What we look for in a candidate: </b></p><ul><li>Sharp judgement</li><li>A clear voice and keen hearing</li><li>Strong motivation</li><li>Good memory</li><li>Excellent problem-solving abilities</li></ul><p><b>Selection Process</b></p><p>The selection process has three stages, may require travel, and lasts from now until April 2020.</p><ul><li>Stage One: Upon completion of online application, candidates will receive an email to take an online test. We recommend completion of the online test within 10 days or sooner.</li></ul><ul><li>The online test will require your full attention so we recommend completing the test when you can be focused and have time.</li><li>As candidate intake is limited, we recommend completing the online test as soon as possible.</li><li>Stage Two: Selected candidates will be invited to NAV CANADA for a one day in-person testing in March 2020.</li><li>Stage 3: Selected candidates will be invited to for a two-day in -person testing in April 2020</li></ul><p><b>Leave Ordinary Behind. Apply today!</b></p><p><b>About NAV CANADA</b></p><p>We&#x2019;re the real-life air traffic controllers, engineers, technologists, software developers, information managers, and business partners who harness the latest technology to keep millions of air travelers safe, pioneering game-changing solutions for the global aviation industry.</p><p>As a national, privately owned company with more than 100 locations across the country, we offer some of the most exciting careers in the field of aviation and has been selected as a Top 100 Employer and Forbes Best Employers for three consecutive years.</p><p>NAV CANADA is committed to building a skilled, diverse workforce reflective of Canadian society. As a result, it promotes employment equity and encourages candidates to indicate voluntarily and clearly on the subject line of their application if they are a woman, an Aboriginal person, a person with a disability or a member of a visible minority group.</p><p>Keywords:<br>Winnipeg, Regina, Manitoba, Brandon, Saskatoon, Air Traffic Controller, aviation jobs, no experience, paid training, airport, top 100 employer, Forbes best employer.</p><p>Job Type: Full-time</p><p>Education:</p><ul><li>Secondary School (Preferred)</li></ul>"
    };
  }
};
</script>

<style lang="scss" scoped>
.areaContainer {
  border-top: 7px solid #eed350;
  padding-left: 55px;
  overflow-y: auto;
  height: 100%;
}
.jobDescriptionContainer {
  padding-top: 33px;
  font-family: Rubik;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
}
.jobTitle {
  
  font-size: 30px;
  font-weight: bold;
  line-height: 1.2;
}
.companyName {
  padding-top: 10px;
  margin-left: 0;
  font-size: 16px;
  line-height: 1.13;
  color: rgba(0, 0, 0, 0.87);
}
.jobDescriptionHeader {
  padding-top: 26px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  color: #1e1e1e;
}
.bulletPoints {
  padding-top: 2px;
}
.bullets {
  margin-left: 15px;
  margin-bottom: 0;
  line-height: 1.33;
  font-size: 12px;
  color: #1e1e1e;
}
.bullets>li {
  padding-top: 8px;
}
.jobDescriptionHTML {
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #1e1e1e;
}
.jobDescriptionHTML {
  /deep/ ul {
    padding: 0;
  }
}

.jobDescriptionHTML {
  /deep/ h2 {
    font-size: 14px;
    font-weight: bold;
  }
}
.jobDescriptionHTML {
  /deep/ h1 {
    font-size: 16px;
    font-weight: bold;
  }
}
.jobDescriptionHTML {
  /deep/ h3 {
    font-size: 13px;
    font-weight: bold;
  }
}
.jobDescriptionHTML {
  /deep/ h4 {
    font-size: 12px;
    font-weight: bold;
  }
}
</style>