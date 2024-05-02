const backendMainDomainURL = "http://localhost:3000";

const backendRoutesAPI = {
      signup : {
            url : `${backendMainDomainURL}/api/v1/customer/signup`,
            method : "post"
      },
      login : {
            url : `${backendMainDomainURL}/api/v1/customer/login`,
            method : "post"
      }
}
export default backendRoutesAPI