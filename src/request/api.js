

    /**   
     * api接口统一管理
     */
    import { gets, post,mesPost } from './http' 


    //示例
    //我们定义了一个apiAddress方法，这个方法有一个参数p，p是我们请求接口时携带的参数对象。
    //export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);


    //调用接口
    //  import { apiAddress } from '@/request/api';// 导入我们的api接口
    // export default {        
    //     name: 'Address',    
    //     created () {
    //         this.onLoad();
    //     },
    //     methods: {            
    //         // 获取数据            
    //         onLoad() {
    //             // 调用api接口，并且提供了两个参数                
    //             apiAddress({                    
    //                 type: 0,                    
    //                 sort: 1                
    //             }).then(res => {
    //                 // 获取数据成功后的其他操作
    //                 ………………                
    //             })            
    //         }        
    //     }
    // }
    //发布app 
    //let appRoute="http://10.12.100.208:9090/";
    //web调试
    let appRoute="";

    export const apiLogin = obj => post(appRoute+'api/Handset/Login', obj);


    export const apiGet = () => gets(appRoute+'api/Handset/get');

    //获取仓库领料数据
    export const apiGetProductionPlanPickInfo = obj => mesPost(appRoute+'api/Store/GetProductionPlanPickInfo',obj);

    //获取仓库入库数据
    export const apiGetStoreIn = obj => mesPost(appRoute+'api/Store/GetStoreIn',obj);

    //扫码出库
    export const apiSetProductionPlanPick = obj => post(appRoute+'api/Store/SetProductionPlanPick',obj);

    //扫码入库
    export const apiSetStorageIn = obj => post(appRoute+'api/Store/SetStorageIn',obj);

    export const apiVersion = () => gets(appRoute+'api/Handset/getVersion');