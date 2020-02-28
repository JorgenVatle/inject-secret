# GH Action: Inject Secret

Inject GitHub secrets into any file. Especially useful for CI/CD where environment variables cannot be used.

```yaml
runs-on: ubuntu-latest
steps:
    - uses: JorgenVatle/inject-secret@v1
      with:
        target: './config/production.json'
        replace: 'S3_SECRET=abc123 SMTP_PASSWORD=supersecret'
```

First you need to prepare your target file for injection. You define the values you want replaced by wrapping them
around four underscores. E.g. `__S3_SECRET__`. To replace this field with "abc123", you'd write `S3_SECRET=abc123` in
your worklow config. 

```json5
// ./config/production.json
{
  "awsSecret": "__S3_SECRET__",
  "smtpPassword": "__SMTP_PASSWORD__"
}
```
Would become:
```json5
// ./config/production.json
{
  "awsSecret": "abc123",
  "smtpPassword": "supersecret"
}
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2020, Jørgen Vatle.