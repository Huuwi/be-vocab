"use strict";
let t = {
    "name": "Understanding MP3",
    "requirement": "Read the text about MP3 and decide if the following sentences are T (True), F (False) or N (Not given)",
    "content": "The name comes from MPEG which stands for the Motion Picture Experts Group. MPEG develops standards for audio and video. MP3 is actually MPEG Audio Layer 3.\nMP3 competes with another audio file format called WAV. The key different is that MP3 files are much smaller than WAV files. An MP3 file can store a minute of sound per megabyte, while a WAV file needs 11 or 12 megabytes to hold the same amount. How does an MP3 achieve this compression? CDs and audio files don’t reproduce every sound of performance. Instead, they sample the performance and store a discrete code for each sampled note. A CD or WAV file may sample a song 44,000 times a second, creating a huge mass of information.\nBy stripping out sound most people can’t hear, MP3 significantly reduces the information stored. For example, most people can’t hear above a frequency of 16kHz, so it eliminates them from the mix. Similarly, it eliminates quiet sounds masked by noise the same frequency. The result is a file that sound very similar to a CD, but which is much smaller. An MP3 file can contain spoken word performances, such as video shows or audio books as well as music. It can provide information about itself in a coded block called a tag. The tag may include the performance’s name, a graphic such as an album cover, the songs’s lyrics, the musical genre, and a URL, for more details.",
    "question": [
        "WAV files are a bit smaller than MP3 files",
        "MP3 is more popular than WAV to the users.",
        "Audio files can't reproduce every sound of performance.",
        "An MP3 can store only music",
        "You can see the songs’ lyrics due to the tag of MP3"
    ],
    "answer": [
        "F",
        "N",
        "T",
        "F",
        "T"
    ]
};
for (let i = 0; i < t.question.length; i++) {
    console.log(t.question[i]);
}
