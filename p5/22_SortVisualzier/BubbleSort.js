function BubbleSort(list, listSize) {

    for(let i = 0; i < listSize; i++) {
        for(let j = 0; j < listSize-i-1; j++) {
            let a = list[j];
            let b = list[j+1];
            if(a > b) {
                swap(list, j, j+1);
            }
        }
    }

}

