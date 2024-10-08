import fs from 'fs';
// import path from 'path';
import { globSync } from 'glob';

const srcDir = 'src'; // 假设 src 目录在当前目录下
const outputFile = 'output.ts'; // 合并后的输出文件

const files = globSync(`${srcDir}/**/*.ts`);

const outputContent = files
  .map((file) => {
    const content = fs.readFileSync(file, 'utf8');
    return content;
  })
  .join('\n');

fs.writeFileSync(outputFile, outputContent);
console.log(`Successfully merged files into ${outputFile}`);
