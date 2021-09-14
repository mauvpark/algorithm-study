# self-avoiding-walk

## Preview
![algo1](https://user-images.githubusercontent.com/74028161/133246730-6ea00976-e865-4704-a6a0-670bf024d000.png)


## Introduction
Self Avoiding Walk는 스스로 중복된 길을 가지 않고 맵을 탐험하는 방법을 연구하는 알고리즘입니다.

## Description
1. 2차원 혹은 3차원으로 이루어진 3D Array를 구성하고 `grid(x,y,z)`를 구성
2. `grid[i][j][k]`는 `index * spacing` 형태로 `grid`의 `item`이 됨
3. `new Spot`으로 각자의 주소 객체를 가진 `grid` `item`들 중 하나를 정해 객체를 업데이트하며 자리를 옮김
4. 좌우정면위아래 중 한 곳씩 골라 현재 좌표에서 이동 가능한 영역인지 판별하고 이동이 가능하면 `Array`에 등록 `nextSpot()`
5. 등록된 `Array`의 `element` 중 랜덤하게 값을 뽑아 이동
6. 더이상 이동할 곳이 존재하지 않아 `Array`에 등록된 `element`가 존재하지 않을 경우 최근의 이동 값을 삭제하고 그 이전의 값으로 이동
7. `path`와 `grid` `item`의 갯수가 같아지면 맵의 모든 지형을 탐색한 것이 되므로 종료

## *Reference*
[The Coding Train](https://www.youtube.com/watch?v=m6-cm6GZ1iw)
