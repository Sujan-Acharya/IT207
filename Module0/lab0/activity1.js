let day = Math.floor(Math.random() * 7) + 1;
  switch(day){
    case 1:
      day = ("Monday");
      break;
    case 2:
      day = ("Tuesday");
      break;
    case 3:
      day = ("Wednesday");
      break;
    case 4:
      day = ("Thursday");
      break;
    case 5:
      day = ("Friday");
      break;
    case 6:
      day = ("Saturday");
      break;
    case 7:
      day = ("Sunday");
      break;
    default:
      day = ("Invalid day");
  }
console.log(day);
