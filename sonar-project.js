// eslint-disable-next-line @typescript-eslint/no-var-requires
const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000/',
    options: {
      'sonar.login': 'admin',
      'sonar.password': '1234',
      'sonar.sources': 'src',
      'sonar.tests': 'test',
      'sonar.inclusions': '**',
      'sonar.exclusions': 'src/main.ts',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml',
    },
  },
  () => {
    // empty functionm
  },
);
