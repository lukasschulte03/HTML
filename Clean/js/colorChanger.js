const colors = [['#467061', '#56937d'],['#f67228', '#fba879'], ['#6c63ff', '#8779ff'], ['#ff2135', '#ff5970'], ['#513252', '#7A4069']]

var result = Math.floor(Math.random() * colors.length)

document.querySelector(":root").style.setProperty('--secondary-color', colors[result][0]);
document.querySelector(":root").style.setProperty('--secondary-accent-color', colors[result][1]);