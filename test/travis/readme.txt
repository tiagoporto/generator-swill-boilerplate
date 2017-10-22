language: node_js

node_js:
  - "stable"

before_install:
  - gem install awesome_bot

script:
  - awesome_bot README.md --allow-redirect --white-list travis-ci
  - npm run lint && npm test
