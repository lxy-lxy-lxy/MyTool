export const CompareResult = {
    eq: 1,
    lt: 2,
    gt: 3
}

export function binarySearch(
    list,
    value,
    compareFunc
) {
    let start = 0;
    let end = list.length - 1;
    let tempIndex = null;

    while (start <= end) {
        tempIndex = Math.floor((start + end) / 2);
        const midValue = list[tempIndex];

        const compareRes = compareFunc(midValue, value);
        if (compareRes === CompareResult.eq) {
            return tempIndex;
        }

        if (compareRes === CompareResult.lt) {
            start = tempIndex + 1;
        } else if (compareRes === CompareResult.gt) {
            end = tempIndex - 1;
        }
    }

    return tempIndex;
}

// 简体字符，用于随机生成内容
const str = "一丁七万丈三上下不与丐丑专且丕世丘丙业丛东丝丞丢两严丧个丫中丰串临丸丹为主丽举乂乃久么义之乌乍乎乏乐乒乓乔乖乘乙乜九乞也习乡书乩买乱乳乾了予争事二亍于亏云互亓五井亘亚些亟亡亢交亥亦产亨亩享京亭亮亲亳亵亶亸人亿什仁仂仃仄仅仆仇仉今介仍从仑仓仔仕他仗付仙仞仟仡代令以仨仪仫们仰仲仳仵件价任份仿企伉伊伋伍伎伏伐休众优伙会伛伞伟传伢伤伥伦伧伪伫伯估伴伶伸伺似伽伾佃但位低住佐佑体何佗佘余佚佛作佝佞佟你佣佤佥佩佬佯佰佳佴佶佻佼佾使侃侄侈侉例侍侏侑侔侗供依侠侣侥侦侧侨侩侪侬侮侯侵便促俄俅俊俎俏俐俑俗俘俚俜保俞俟信俣俦俨俩俪俭修俯俱俳俵俶俸俺俾倌倍倏倒倓倔倘候倚倜倞借倡倥倦倨倩倪倬倭债倻值倾偃假偈偌偎偏偕做停健偬"

export function getContent() {
    return str.substring(Math.random() * 50, Math.random() * 100)
}