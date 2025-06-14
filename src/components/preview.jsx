import styles from "../styles/preview.module.css";
import { format } from "date-fns";
import { Truncate } from "@re-dev/react-truncate";

function Preview({ title, prev, author, created, published, list = false}){
    function formatDate(date){
        const dt = new Date(date);
        const formatted = format(dt, "do MMMM yyyy");
        return formatted;
      }
    return (
        <div className={list ? styles.prev : styles.preview}>
            {list && <p className={styles.published}>{published ? 'Published' : 'Unpublished'}</p> }
            {!list && <Truncate lines={3} ellipsis={<span>...</span>} className={styles.peek}>{prev}</Truncate>}
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{formatDate(created)}</p>
        </div>
    )
}

export default Preview;