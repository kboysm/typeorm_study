export class Page<T> {
  pageSize: number; // rowPerPage
  totalCount: number; // table row의 총 count
  totalPage: number; // 프론트엔드에서 보여줘야할 페이지네이션 갯수
  items: T[]; // result 배열

  constructor(totalCount: number, pageSize: number, items: T[]) {
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.items = items;
  }
}

/*
클래스 식별자 선언부에 <T>라는 못보던 문법이 추가된 것을 확인할 수 있다.
제네릭을 사용하겠다는 의미로 꺽쇠(Angle brackets)를 넣고 그 안에 타입으로
사용되는 식별자를 집어넣는다.

T는 Type의 약자로 다른 언어에서도 제네릭을 선언할 때 관용적으로 많이 사용된다.
이 부분에는 식별자로 사용할 수 있는 것이라면 무엇이든 들어갈 수 있다.
이를테면 $나 _도 가능하다는 의미다.
하지만 대개의 경우 T를 사용한다. 여기에서 T를 타입 변수(Type variables)라고 한다.

이렇게해서 클래스에서 제네릭을 사용하겠다고 선언한 경우 T는 해당 클래스에서
사용할 수 있는 특정한 타입이 된다.

사용법은 아래와 같다. 그저 생성자를 호출하여 객체를 만들 때 T로 사용될 타입을 
지정해주기만 하면 된다.
*/
