<template>
    <header>
        <img src="../images/indite-logo.png" alt="" width="150px">
        <p>I can do everything!</p>
        <nav id="nav-header">
            <!-- ul样式重置 reset.css -->
            <ul id="nav-ul">
                <li class="menu-item active">
                    <router-link to="/home">
                        <span>Home</span> 
                    </router-link>
                </li>
                <li class="menu-item">
                    <router-link to="/notes">
                        <span>Notes</span> 
                    </router-link>
                </li>
                <li class="menu-item">
                    <router-link to="/others">
                        <span>Others</span> 
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
export default {
    mounted() {
        let oNavUl = document.getElementById('nav-ul');
        let oNavLis = oNavUl.getElementsByTagName('li');
        // let oSection = document.getElementById('sections');
        // let oSectionArr = oSection.getElementsByTagName('section');
        for (let i = 0; i < oNavLis.length; i++) {
            oNavLis[i].onclick = function(){
                for (let j = 0; j < oNavLis.length; j++) {
                    if(oNavLis[j].classList.value.includes('active')){
                        oNavLis[j].classList.remove('active')
                    }
                    // if(oSectionArr[j].classList.value.includes('active')){
                    //     oSectionArr[j].classList.remove('active')
                    // }
                }
                oNavLis[i].classList.add('active');
                // oSectionArr[i].classList.add('active')
            }
        }
    },
}
</script>
<style lang="scss" scoped>
header{
    width: 320px;
    padding: 20px 50px;
    box-sizing: border-box; //
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05), 1px 0 rgba(0, 0, 0, 0.05);
    border-top: 10px solid #32c1fb;
    background: #fff;
    
    #nav-header{
        margin-top: 50px;
        .menu-item{
            margin-left: -50px;
            padding-left: 50px;
            &:hover{
                cursor: pointer;
            }
        }
        .active{
            position: relative;
            span{
                color: #333;
            }
            // 选中标识
            &::before{
                content: '';
                display: block;
                width: 14px;
                height: 14px;
                background: #e3e3e3;
                position: absolute;
                left: -7px;
                top: 19px;
                transform: rotate(45deg);
            }
        }
        span{
            color: #666666;
            font-size: 18px;
            font-weight: 600;
            width: 220px;
            height: 20px;
            line-height: 20px;
            display: inline-block;
            padding: 16px 50px;
            margin-left: -50px; //
            &:hover{ //&为less语法  表示当前选择器的父级
                background: #f5f5f5;
                color: #333;
            }
        }
        
    }
}
</style>