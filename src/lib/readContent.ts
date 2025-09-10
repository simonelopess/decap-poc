import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function readContent(project: string) {
  const projectsDir = path.join(process.cwd(), `src/content/${project}`);
  const filenames = fs.readdirSync(projectsDir);

  return filenames.map((filename) => {
    const filePath = path.join(projectsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      ...data,
      content,
    };
  });
}
