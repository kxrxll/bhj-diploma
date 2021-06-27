/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.responseType = options.responseType;
  if (options.method === 'GET'){
    let urlLong = options.url + '?';
    for(data in options.data) {
      urlLong += (data + '=' + options.data[data] + '&');
    }
    urlLong= urlLong.substring(0, urlLong.length - 1);
    xhr.open(options.method, urlLong);
    xhr.send();
  } else {
    formData = new FormData;
    for(data in options.data) {
    formData.append(data, options.data[data]);
    }
    xhr.open(options.method, options.url);
    xhr.send(formData);
  }
  xhr.addEventListener('readystatechange', function(){ 
    if(this.readyState == this.DONE && this.status == 200){
      options.callback(null, this.response);
    } else if(this.readyState == this.DONE && this.status != 200)
    {
      options.callback(this.response, null);
    }
  })}