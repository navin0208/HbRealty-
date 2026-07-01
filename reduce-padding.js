const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const dir = path.join(__dirname, 'app', '(main)');
const files = walk(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Reduce massive paddings
  content = content.replace(/py-32/g, 'py-16');
  content = content.replace(/py-24/g, 'py-12');
  content = content.replace(/my-32/g, 'my-16');
  content = content.replace(/my-24/g, 'my-12');
  
  // Some specific md: variants
  content = content.replace(/md:py-32/g, 'md:py-20');
  content = content.replace(/md:py-24/g, 'md:py-16');
  content = content.replace(/md:my-32/g, 'md:my-20');
  content = content.replace(/md:my-24/g, 'md:my-16');
  
  // Huge gaps
  content = content.replace(/gap-32/g, 'gap-16');
  content = content.replace(/space-y-32/g, 'space-y-16');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated paddings in ${file}`);
  }
});
