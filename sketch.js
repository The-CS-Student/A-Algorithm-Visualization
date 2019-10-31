Grids = []
rows = 8
cols = 8
Scale = 600/8
selVal = "Start"
startBool = false
endBool = false
startIndex = 0
endIndex = 0
curSelection = "Start"
prevCI = null
function setup() {
	createCanvas(600, 600);
	
	sel = createSelect();
	  sel.position(620, 20);
	  sel.option('Start');
	  sel.option('End');
	  sel.option('Normal');
	  sel.option('Connect');
sel.changed(mySelectEvent);
button = createButton('Find Path');
  button.position(620, 40);
  button.mousePressed(changeBG);
}

function changeBG() {
  Astar(startIndex,endIndex,Grids)
}

function mySelectEvent() {
 curSelection = sel.value();
 
}
function draw() {
	background(0)
	
	if(Grids.length>0){
	for(var i=0;i<Grids.length;i++){
			Grids[i].show()

		
	}
}

}
function removendex(array,index){
	newarray = []
	for(var i =0;i<array.length;i++){
		if(i!=index){
			newarray.push(array[i])

		}
	}
	return newarray
}
function removeIndex(Grid1,index){
	for(var i=0;i<Grid1.neighbours.length;i++){
		array = Grid1.neighbours[i]
		if(array[2]==index){
			Grid1.neighbours = removendex(Grid1.neighbours,i)
		}
	}

}
function distance(Grid1,Grid2){


var a = Grid1.x - Grid2.x;
var b = Grid1.y - Grid2.y;

var c = Math.sqrt( a*a + b*b );
return c
}
function Astar(startIndex,endIndex,Grids){
	print("Start")
	index = startIndex
	g = 0
	while(index!=endIndex){
		scoresArr = []
		indexArr = []
		for(var i = 0;i<Grids[index].neighbours.length;i++){
			array = Grids[index].neighbours
			

				scoresArr.push(g+distance(Grids[index],Grids[array[i][2]])+distance(Grids[i],Grids[array[i][2]]))
				indexArr.push(array[i][2])
			
		}
		
		minimumVal = Math.min.apply(Math,scoresArr)
		indexoptT = scoresArr.indexOf(minimumVal)
		indexopt = indexArr[indexoptT]
		
		g+=distance(Grids[index],Grids[indexopt])

		Grids[index].neighbours = []
		Grids[index].neighbours.push([Grids[indexopt].x,Grids[indexopt].y,indexopt])
		Grids[index].nline = 'rgba(100%,0%,100%,0.5)'
		removeIndex(Grids[indexopt],index)
		index = indexopt
		
		
	}
	print("Finished")
}
function mousePressed() {
	curx = mouseX

	cury = mouseY
	if(curx>=0 && curx<=600){
		if(cury>=0 && cury<=600){

			if(curSelection=="Start"){
				if(startBool==false){
					Grids.push(new Node(curx,cury))
					startIndex = Grids.length-1
					Grids[startIndex].status = "Start"
					startBool=true

			}
			else{
				
						Grids[startIndex].x = curx
						Grids[startIndex].y = cury
				
			}
		}
			else if(curSelection=="End"){
				if(endBool==false){
					Grids.push(new Node(curx,cury))
					endIndex = Grids.length-1
					Grids[endIndex].status = "End"
					endBool=true

			}
			else{
				
						Grids[endIndex].x = curx
						Grids[endIndex].y = cury
				
			}
		}
			else if(curSelection=="Normal"){
					
							Grids.push(new Node(curx,cury))


				
			}
			else if(curSelection=="Connect"){
				if(prevCI == null){
					for(var i = 0;i<Grids.length;i++){
						if((curx-Grids[i].x)**2+(cury-Grids[i].y)**2<=24**2){
							prevCI = i
							print(prevCI)

						}
					}
					
					
				}
				else if(prevCI!=null){
					for(var i = 0;i<Grids.length;i++){

						if((curx-Grids[i].x)**2+(cury-Grids[i].y)**2<=24**2){
							newCI = i

						}

					}
					console.log(prevCI,newCI)
					Grids[prevCI].neighbours.push([Grids[newCI].x,Grids[newCI].y,newCI])
					Grids[newCI].neighbours.push([Grids[prevCI].x,Grids[prevCI].y,prevCI])

				prevCI = null
				}
			}
			
			
	
	

			}
			}
}

class Node{
constructor(x,y){
	this.x = x
	this.y = y
	this.size  = 24
	this.status = "Normal"
	this.neighbours = []
	this.nline = (255,255,255)
}
	show(){
		if(this.status=="Normal"){
		fill(color(0,0, 255))
		ellipse(this.x,this.y,this.size,this.size)
		for(var i =0;i<this.neighbours.length;i++){
			stroke(this.nline)
			strokeWeight(3)
			line(this.x,this.y,this.neighbours[i][0],this.neighbours[i][1])
		}
	}
	else if(this.status=="Start"){
		
		fill(color(0,255,0))
		ellipse(this.x,this.y,this.size,this.size)
		for(var i =0;i<this.neighbours.length;i++){
			stroke(this.nline)
			strokeWeight(3)
			line(this.x,this.y,this.neighbours[i][0],this.neighbours[i][1])
		}
	
	
	
	}
	else if(this.status=="End"){
	
		
	fill(color(255,0,0))
	ellipse(this.x,this.y,this.size,this.size)
	for(var i =0;i<this.neighbours.length;i++){
			stroke(this.nline)
			strokeWeight(3)
			line(this.x,this.y,this.neighbours[i][0],this.neighbours[i][1])
		}
	
	}
	}
	

}