import { DATA_TYPES, FILTERS } from 'constants/app'

export const groupNested = (items, firstLevelValue, parentKey, parentGroupKey) => {
    // Create root for top-level node(s)
    const root = [];
    // Cache found parent index
    const map = {};

    items.forEach(node => {
        // No parentId means top level
        if (node[parentGroupKey] === firstLevelValue) return root.push(node);

        // Insert node as child of parent in items array
        let parentIndex = map[node[parentGroupKey]];
        if (typeof parentIndex !== "number") {
            parentIndex = items.findIndex(el => el[parentKey] === node[parentGroupKey]);
            map[node[parentGroupKey]] = parentIndex;
        }

        if (!items[parentIndex].children) {
            return items[parentIndex].children = [node];
        }

        items[parentIndex].children.push(node);
    });

    return root;
}

export const makeCommonFilterObject = filterConfig => {
    let resultObj = {}
    filterConfig.forEach(filter => {
        if (filter.type === DATA_TYPES.NUMBER)
            resultObj = { ...resultObj, [filter.field]: 0 }
        else if (filter.type === DATA_TYPES.STRING) {
            resultObj = { ...resultObj, [filter.field]: "", [filter.tbfield]: FILTERS.CONTAINS }
        }
    })
    return resultObj
}

export const prepareActions = (act, actFunct) => {
    return Object.keys(actFunct).reduce((acumKey, valActKey) => {
        return {
            ...acumKey,
            [valActKey]: actFunct[valActKey].reduce((acum, valAct) => {
                return [act.filter(val => val.codigo === valAct.cod).length ? valAct : null, ...acum]
            }, [])
        }
    }, {})
}