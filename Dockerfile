# docker build -t vkonst/ap-tester .
# export COVERALLS_TOKEN=...; docker run -it --rm --name tmp -e COVERALLS_REPO_TOKEN=$COVERALLS_TOKEN vkonst/ap-tester

FROM node:10.21.0-jessie

RUN apt-get update && apt-get install -y jq


WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install

RUN mkdir scripts && \
   echo '#!/bin/sh\n' > scripts/start.sh && \
   chmod +x scripts/start.sh && \
   echo '\
[ -z "${COVERALLS_REPO_TOKEN}" ] && { echo "FAILD: coveralls repo_token unknown"; exit 1; } \n\
[ -f .coveralls.yml ] || echo "repo_token: ${COVERALLS_REPO_TOKEN}" > .coveralls.yml \n\n\
({ yarn bootstrap && yarn build && yarn test && yarn coverage; } | tee /tmp/ap-monorepo.log) && echo SUCCESS || echo FAILED \n\n\
fd=0; [ -t "$fd" ] && { echo press enter to exit; read -r res; }' >> scripts/start.sh;

COPY del.me  ./

ENTRYPOINT ["/bin/sh"]
CMD ["-c", "/app/scripts/start.sh"]
