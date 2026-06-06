const fs = require('fs');

async function checkLayouts() {
  for (let i=1; i<=4; i++) {
    const file = `public/profilebuilder_projects/${i}.png`;
    if (fs.existsSync(file)) {
      console.log(`Layout ${i} exists. File size: ${fs.statSync(file).size} bytes`);
    } else {
      console.log(`Layout ${i} DOES NOT exist`);
    }
  }
}

checkLayouts();
