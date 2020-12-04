export default function Card(props){
    return(
        <div id = {props.id} className = 'cardContainer'>
            {props.children}
            <img width= '40px' height = '40px' style = {{position:'absolute',right:'1vw',top:'2vh'}} src = '/images/Checkmark.png' />
        </div>
    );
}