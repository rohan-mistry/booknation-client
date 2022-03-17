export function IsLogin() {
    
  const local = localStorage.getItem('id') && localStorage.getItem('token');

  const session =  sessionStorage.getItem('id') && sessionStorage.getItem('token');

  return local || session;
}