import styles from '../styles/about.module.css';

function About(){
    return (
      <div className={styles.wrapper}>
        <h1>About Reverie</h1>
        <div className={styles.text}>
          <p className={styles.deet}>
            Welcome to Reverie!. Reverie is a minimalist blog platform built as
            part of the Odin Project's NodeJS Curriculum. On Reverie you can
            write a blog post (Which I call a Reverie), read reveries, post a
            comment on reveries and read other peoples' comments. You'll need to
            sign up for an account in order to be able to edit reveries and
            comments. You can only edit, publish or delete reveries you've
            written as well as comments written by you. This project is one of
            my favorite projects out of the hundreds i've done, in fact it is my
            favorite full stack project as of the time of writing this. I really
            enjoyed every bit of the development process, i tried my best to
            make it have a calm, minimalistic interface that is somehow
            nostalgic and might evoke memories (sort of like an old notebook or better
            a beloved article collection ), or at the very least bring calm.
            I really hope you like the project as much as i do. I've thought of
            building a feedback form here, but anyway just leave any feedback or
            suggesstions you might have on the welcome reverie (blog post) over
            at the explore page. Thank you for visiting!.
          </p>
          <p>
            Feel free to check out the project's repo using this{" "}
            <a href="https://github.com/Dev-Dul/Reverie" target="_blank">Link.</a>
          </p>
          <p>You can find me on <a href="https://github.com/Dev-Dul" target="_blank">Github.</a></p>
          <p>Current Version: 1.0</p>
        </div>
      </div>
    );
}

export default About;