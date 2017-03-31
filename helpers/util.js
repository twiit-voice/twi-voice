module.exports = {
  formatDate1: function(date) {
    let _date = new Date(date)
    let yyyy = _date.getFullYear()
    let mm = ('0' + (_date.getMonth()+1)).slice(-2)
    let dd = ('0' + (_date.getDate())).slice(-2)
    let hh = ('0' + (_date.getHours())).slice(-2)
    let nn = ('0' + (_date.getMinutes())).slice(-2)
    return `${yyyy}-${mm}-${dd} ${hh}:${nn}`
  }
}