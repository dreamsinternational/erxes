import fs from "fs";
import chalk from "chalk";
import yaml from "yaml";

export default async function devGenerate() {
  await createStatic();
  const erxesConfig = await readConfig();
  await generateDockerCompose(erxesConfig);
}

const dockerfile = `FROM node:14-slim
WORKDIR /app

`;

function createStatic() {
  if (!fs.existsSync("./.dev")) {
    fs.mkdirSync("./.dev");
    console.log(chalk.green("Create dir ./.dev"))
  }

  fs.writeFileSync("./.dev/Dockerfile", dockerfile);
  console.log(chalk.green("Create file ./.dev/Dockerfile"))
}

async function readConfig() {
  if (!fs.existsSync("./erxes.config.dev.yml")) {
    console.log(chalk.red.bold("./erxes.config.dev.yml file does not exist."));
    return;
  }
  const yamlString = fs.readFileSync("./erxes.config.dev.yml").toString();
  const erxesConfig = yaml.parse(yamlString);

  console.log(chalk.green("Read erxes config from ./erxes.config.dev.yml"));
  return erxesConfig;
}

const build = {
  context: "../",
  dockerfile: "./.dev/Dockerfile",
};

async function generateDockerCompose(erxesConfig) {
  console.log(chalk.green(erxesConfig));

  const dockerComposeConfig = {
    version: "3.8",
    secrets: {
      "erxes.config.yml": {
        file: "../erxes.config.dev.yml",
      },
    },
    networks: {
      "erxes-dev": {
        driver: "bridge",
      },
    },
    services: {
      core: {
        container_name: "core",
        build,
        secrets: ["erxes.config.yml"],
        volumes: ["../:/app"],
        command: "yarn workspace core dev",
        networks: ['erxes-dev']
      },
    },
  };

  const yamlString = yaml.stringify(dockerComposeConfig);

  fs.writeFileSync("./.dev/docker-compose.yml", yamlString);

  console.log(chalk.green('Created a docker-compose file in ./.dev/docker-compose.yml'));
}