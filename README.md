# Classbadbad-blog backend
Computer Security's terms project

## User Role
`0 : admin`
`1 : user`
## ACL
| Role  | Own post | Others post | Own comment | Others comment         |
|-------|----------|-------------|-------------|-----------------------|
| Admin | CRUD     | RUD         | CRUD        | RUD                   |
| User  | CRUD     | R           | CRUD        | RD(Only on self post) |

## Member

Flap

เกื้อ

Ajin

XinTien

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start
```

## License

  Nest is [MIT licensed](LICENSE).
