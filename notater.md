# Notater
[Markdown Guide](https://www.markdownguide.org/basic-syntax)

Tabeller som trengs
- Challenges
- Results
- Voting




## Challenges object
``` json 
{
    "id": 1,
    "name": "Challeng 1",
    "description": "Lorem ipsum",
    "imageUrl": "./sti_til_bilde/bilde.png",
    "active": true,
    "training": true
}
```

## Results object
``` json 
{
    "id": 1,
    "challengesID": 1,
    "userName": "Dag-Roger",
    "editorData": "HTML KODE",
    "dato": "dato"
}
```

## Voting object
``` json 
{
    "id": 1,
    "challengesID": 1,
    "userName": "Dag-Roger",
    "dato": "dato",
    "votes": 1
}
```


Sider
- Voting
- Voting resultat
- Timer
