FROM smartcontract/chainlink:1.6.0-root

RUN mkdir /chainlink

COPY .api /chainlink/.api
COPY .password /chainlink/.password