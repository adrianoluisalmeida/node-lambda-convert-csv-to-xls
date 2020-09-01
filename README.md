## Envio do pacote para o lambda:

Como o pacote contém dependências de terceiros, foi necessário o aws sdk

```shell
npm install aws-xray-sdk
```
Obs: Nao é necessário instalar mais, ja está no package.json, portanto, basta rodar **npm install**.

Caso tenha modificações, é necessário compactar os files: 

```shell
zip -r function.zip .
```


Para arquivos maiores que 10MB é necessário enviar pela linha de comando. Porém para enviar é necessário instalar de forma global uma lib do aws
```shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Depois de instalar, é necessário configurar o ambiente:

```shell
aws configure
```

**Informar**: accessKeyId, secretAccessKey e região (São Paulo) sa-east-1


```shell
aws lambda update-function-code --function-name my-function --zip-file fileb://function.zip
```

**my-function** (nome da função no lambda): nameFunction 


Parâmetros - enviados para o lambda service na aws

```json
{
  "bucket": "example-localhost",
  "key": "example/5/example/example-21-05-2020-16-16-52-286442.csv",
  "extension": "xls"
}
```

**extension**: xls | xlsx   
**key**: filePath   
**bucket**: bucket na s3   

