 import { useMemo, useState } from 'react'
 import { supabase } from './supabaseClient.js';
import {
  Aperture, Bell, Camera, Check, ChevronRight, Compass, Copy, Heart,
  Home, ImagePlus, MessageCircle, Moon, MoreHorizontal, Music2, Phone,
  Plus, Search, Send, Settings, Share2, Sparkles, Sun, Users, Video,
  X, Bookmark, Play, UserRound, Clapperboard, Upload, Mic, PhoneOff,
} from 'lucide-react'
import './App.css'

const names = [
  'Bikram', 'Vishal', 'Sahil', 'Siddharth', 'Ananya', 'Rohan', 'Priya', 'Kabir',
  'Aisha', 'Arjun', 'Meera', 'Dev', 'Ishita', 'Reyansh', 'Diya', 'Aditya',
  'Kiara', 'Nikhil', 'Sara', 'Vivaan', 'Myra', 'Ishaan', 'Tara', 'Rahul',
  'Zoya', 'Karan', 'Navya', 'Aryan', 'Riya', 'Krish', 'Avni', 'Yash',
  'Simran', 'Ayaan', 'Pooja', 'Om', 'Anika', 'Manav', 'Ira', 'Neil',
]

const photoIds = [
  'photo-1470770841072-f978cf4d019e','photo-1470252649378-9c29740c9fa8','photo-1500530855697-b586d89ba3ee',
  'photo-1472214103451-9374bd1c798e','photo-1501785888041-af3ef285b470','photo-1464822759023-fed622ff2c3b',
  'photo-1441974231531-c6227db76b6e','photo-1507525428034-b723cf961d3e','photo-1518837695005-2083093ee35b',
  'photo-1519681393784-d120267933ba','photo-1500534623283-312aade485b7','photo-1472396961693-142e6e269027',
  'photo-1490750967868-88aa4486c946','photo-1493246507139-91e8fad9978e','photo-1500534314209-a25ddb2bd429',
  'photo-1511497584788-876760111969','photo-1524504388940-b1c1722653e1','photo-1500648767791-00dcc994a43e',
  'photo-1515886657613-9f3515b0c78f','photo-1529139574466-a303027c1d8b','photo-1483985988355-763728e1935b',
  'photo-1525507119028-ed4c629a60a3','photo-1517248135467-4c7edcad34c4','photo-1512621776951-a57141f2eefd',
  'photo-1540189549336-e6e99c3679fe','photo-1473093295043-cdd812d0e601','photo-1495474472287-4d71bcdd2085',
  'photo-1511795409834-ef04bbd61622','photo-1519608487953-e999c86e7455','photo-1518005020951-eccb494ad742',
  'photo-1487958449943-2429e8be8625','photo-1511818966892-d7d671e672a2','photo-1497366754035-f200968a6e72',
  'photo-1497366216548-37526070297c','photo-1500530855697-b586d89ba3ee','photo-1493246507139-91e8fad9978e',
  'photo-1519681393784-d120267933ba','photo-1500534623283-312aade485b7','photo-1470770841072-f978cf4d019e',
  'photo-1517841905240-472988babdf9','photo-1517841905240-472988babdf9','photo-1517841905240-472988babdf9',
  'photo-1523438885200-e635ba2c371e','photo-1512316609839-ce289d3eba0a','photo-1503342217505-b0a15ec3261c',
  'photo-1483985988355-763728e1935b','photo-1515886657613-9f3515b0c78f','photo-1529139574466-a303027c1d8b',
  'photo-1534528741775-53994a69daeb','photo-1524504388940-b1c1722653e1','photo-1531123897727-8f129e1688ce',
  'photo-1506794778202-cad84cf45f1d','photo-1500648767791-00dcc994a43e','photo-1506794778202-cad84cf45f1d',
  'photo-1490645935967-10de6ba17061','photo-1547592180-85f173990554','photo-1498837167922-ddd27525d352',
  'photo-1512621776951-a57141f2eefd','photo-1540189549336-e6e99c3679fe','photo-1473093295043-cdd812d0e601',
  'photo-1495474472287-4d71bcdd2085','photo-1517248135467-4c7edcad34c4','photo-1493853980964-2e2c3e7c8b5f',
  'photo-1500530855697-b586d89ba3ee','photo-1518005020951-eccb494ad742','photo-1487958449943-2429e8be8625',
  'photo-1497366754035-f200968a6e72','photo-1497366216548-37526070297c','photo-1497366811353-6870744d04b2',
  'photo-1486406146926-c627a92ad1ab','photo-1511818966892-d7d671e672a2','photo-1487958449943-2429e8be8625',
  'photo-1518837695005-2083093ee35b','photo-1507525428034-b723cf961d3e','photo-1497436072909-60f36a5d1e1c',
  'photo-1470252649378-9c29740c9fa8','photo-1511497584788-876760111969','photo-1441974231531-c6227db76b6e',
]

const categories = ['For you', 'Nature', 'Travel', 'People', 'Fashion', 'Food', 'Architecture']
const captions = [
  'Finding beauty in the little things. ✨',
  'A little escape from the everyday 🌿',
  'Collect moments, not things.',
  'A view worth remembering.',
  'Today deserves to be remembered.',
  'Good vibes, great memories.',
  'One more reason to explore.',
  'Little details, big feelings.',
]

const gallery = photoIds.map((id, index) => ({
  id: index + 1,
  image: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=720&q=82`,
  category: categories[1 + (index % 6)],
  user: names[(index * 7 + 3) % names.length],
  likes: 23 + ((index * 47) % 1300),
  caption: captions[index % captions.length],
}))

const startPosts = [
  { id: 101, user: 'Bikram', caption: 'Finding beauty in the little things. ✨', image: gallery[0].image, likes: 128, liked: false, comments: [] },
  { id: 102, user: 'Vishal', caption: 'A little escape from the everyday 🌿', image: gallery[1].image, likes: 86, liked: false, comments: [] },
  { id: 103, user: 'Sahil', caption: 'Collect moments, not things.', image: gallery[4].image, likes: 214, liked: false, comments: [] },
]

const musicOptions = ['Chill instrumental', 'Acoustic morning', 'Upbeat pop', 'Ambient sounds', 'No music']
const avatarColors = ['#D9F76A', '#D8E3FF', '#FFD6C9', '#EAD7FF', '#C9F2E4', '#FFE7A8']

function avatarColor(name) {
  return avatarColors[Math.abs(name.split('').reduce((n, c) => n + c.charCodeAt(0), 0)) % avatarColors.length]
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [page, setPage] = useState('Home')
  const [posts, setPosts] = useState(startPosts)
  const [stories, setStories] = useState(names.slice(0, 8).map((name, i) => ({ id: i + 1, name, image: gallery[(i * 3) % gallery.length].image, music: 'Chill instrumental' })))
  const [caption, setCaption] = useState('')
  const [postImage, setPostImage] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('For you')
  const [visibleCount, setVisibleCount] = useState(24)
  const [notice, setNotice] = useState('')
  const [music, setMusic] = useState(musicOptions[0])
  const [storyImage, setStoryImage] = useState('')
  const [storyCaption, setStoryCaption] = useState('')
  const [storyViewer, setStoryViewer] = useState(null)
  const [selectedCall, setSelectedCall] = useState(null)
  const [commentPost, setCommentPost] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [snapImage, setSnapImage] = useState('')
  const [messagePerson, setMessagePerson] = useState('Vishal')
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState({ Vishal: [], Sahil: [] })

  const filteredGallery = useMemo(() => gallery.filter(photo => {
    const categoryOk = category === 'For you' || photo.category === category
    const query = `${photo.user} ${photo.caption} ${photo.category}`.toLowerCase()
    return categoryOk && query.includes(search.toLowerCase())
  }), [category, search])

  function notify(text) {
    setNotice(text)
    window.clearTimeout(window.__vybeTimer)
    window.__vybeTimer = window.setTimeout(() => setNotice(''), 2800)
  }

  function go(destination) {
    setPage(destination)
    if (destination !== 'Explore') setSearch('')
  }

  function setPhotoFromInput(event, setter) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      notify('Please choose an image file.')
      return
    }
    setter(URL.createObjectURL(file))
  }

  
async function toggleLike(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  const { data: { user }, error: authError } =
    await supabase.auth.getUser();

  if (authError) {
    console.error(authError);
    alert("Could not check login: " + authError.message);
    return;
  }

  if (!user) {
    alert("Please sign in before liking a post.");
    return;
  }

  let result;

  if (post.liked) {
    result = await supabase
      .from("likes")
      .delete()
      .eq("post_id", id)
      .eq("user_id", user.id);
  } else {
    result = await supabase
      .from("likes")
      .insert({
        post_id: id,
        user_id: user.id
      });
  }

  if (result.error) {
    console.error("Supabase like error:", result.error);
    alert("Like not saved: " + result.error.message);
    return;
  }

  setPosts((old) =>
    old.map((p) =>
      p.id === id
        ? {
            ...p,
            liked: !p.liked,
            likes: p.likes + (p.liked ? -1 : 1)
          }
        : p
    )
  );
}


  function heartLike(id) {
    setPosts(old => old.map(post => post.id === id
      ? { ...post, liked: true, likes: post.likes + (post.liked ? 0 : 1) }
      : post))
    notify('❤️❤️')
  }

  async function sharePost(post) {
    const url = `${window.location.origin}/?post=${post.id}`
    try {
      if (navigator.share) await navigator.share({ title: 'VYBE post', text: post.caption, url })
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        notify('Post link copied!')
      } else notify(`Copy this link: ${url}`)
    } catch { /* user cancelled native share sheet */ }
  }

  function publishPost(event) {
    event.preventDefault()
    if (!caption.trim() && !postImage) return notify('Add a caption or a photo first.')
    setPosts(old => [{ id: Date.now(), user: 'Bikram', caption: caption.trim(), image: postImage, likes: 0, liked: false, comments: [] }, ...old])
    setCaption('')
    setPostImage('')
    go('Home')
    notify('Your demo post was added.')
  }

  function publishStory(event) {
    event.preventDefault()
    if (!storyImage) return notify('Choose a photo for your Story first.')
    setStories(old => [{ id: Date.now(), name: 'Bikram', image: storyImage, caption: storyCaption, music }, ...old])
    setStoryImage('')
    setStoryCaption('')
    go('Home')
    notify('Story added to this demo.')
  }

  function sendComment(event) {
    event.preventDefault()
    if (!commentText.trim() || commentPost === null) return
    setPosts(old => old.map(post => post.id === commentPost ? { ...post, comments: [...post.comments, commentText.trim()] } : post))
    setCommentText('')
    notify('Comment added.')
  }

  function sendMessage(event) {
    event.preventDefault()
    if (!messageText.trim()) return
    setMessages(old => ({ ...old, [messagePerson]: [...(old[messagePerson] || []), messageText.trim()] }))
    setMessageText('')
  }

  const navItems = [
    { label: 'Home', icon: Home }, { label: 'Explore', icon: Compass },
    { label: 'Snaps', icon: Camera }, { label: 'Stories', icon: Aperture },
    { label: 'Messages', icon: MessageCircle }, { label: 'Calls', icon: Phone },
    { label: 'Profile', icon: UserRound },
  ]

  return (
    <main className={`app ${dark ? 'dark' : ''}`}>
      <header className="topbar">
        <button className="brand" onClick={() => go('Home')} aria-label="VYBE home">
          <span className="brand-icon"><Sparkles size={20} /></span><span>VYBE<span className="brand-dot">.</span></span>
        </button>
        <label className="header-search"><Search size={17} /><input value={search} placeholder="Search creators, photos..." onFocus={() => setPage('Explore')} onChange={e => { setSearch(e.target.value); setPage('Explore') }} /></label>
        <div className="top-actions">
          <button className="icon-button notification-button" aria-label="Notifications" onClick={() => notify('You are all caught up.')}><Bell size={18} /></button>
          <button className="theme-toggle" onClick={() => setDark(value => !value)}>{dark ? <Sun size={16} /> : <Moon size={16} />}<span>{dark ? 'Day mode' : 'Night mode'}</span></button>
          <button className="avatar top-avatar" style={{ background: avatarColor('Bikram') }} onClick={() => go('Profile')}>B</button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <p className="section-label">YOUR SPACE</p>
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${page === label ? 'active' : ''}`} onClick={() => go(label)}><Icon size={19} /><span>{label}</span></button>)}
          <button className="primary-button sidebar-create" onClick={() => go('Create')}><Plus size={17} /> Create post</button>
          <div className="sidebar-note"><Sparkles size={23} /><strong>Your world.</strong><p>Your people. Your VYBE.</p></div>
          <p className="sidebar-legal">Local demo · Not published</p>
        </aside>

        <section className="main-content">
          {page === 'Home' && <>
            <section className="hero"><div><p className="eyebrow">YOUR SOCIAL WORLD</p><h1>What's your <span>VYBE?</span></h1><p>Discover moments. Share your world.</p><button className="hero-button" onClick={() => go('Explore')}>Explore photos <ChevronRight size={16} /></button></div><div className="hero-art"><span className="hero-orbit orbit-one" /><span className="hero-orbit orbit-two" /><Sparkles size={47} /></div></section>
            <section className="panel stories-panel">
              <div className="section-heading"><div><h2>Stories</h2><p>Little moments from your people</p></div><button className="text-button" onClick={() => go('Stories')}>View all <ChevronRight size={15} /></button></div>
              <div className="stories-row"><button className="story" onClick={() => go('Stories')}><span className="story-ring own-story"><span><Plus size={19} /></span></span><span>Your story</span></button>{stories.slice(0, 10).map((story, i) => <button key={story.id} className="story" onClick={() => setStoryViewer(story)}><span className="story-ring" style={{ '--ring': avatarColor(story.name) }}><img src={story.image} alt="" /></span><span>{story.name}</span></button>)}</div>
              <div className="music-row"><Music2 size={18} /><label htmlFor="story-music-home">Story music</label><select id="story-music-home" value={music} onChange={e => setMusic(e.target.value)}>{musicOptions.map(option => <option key={option}>{option}</option>)}</select><button className="small-button" onClick={() => go('Stories')}>Create Story</button></div>
            </section>
            <CreateForm caption={caption} setCaption={setCaption} image={postImage} onImage={e => setPhotoFromInput(e, setPostImage)} onSubmit={publishPost} />
            <div className="section-heading feed-heading"><div><h2>Your feed</h2><p>Fresh moments for you</p></div><button className="text-button" onClick={() => go('Explore')}>Discover more <ChevronRight size={15} /></button></div>
            {posts.map(post => <PostCard key={post.id} post={post} onLike={toggleLike} onHeart={heartLike} onShare={sharePost} onComment={() => setCommentPost(post.id)} />)}
          </>}

          {page === 'Explore' && <section className="explore-page">
            <section className="hero explore-hero"><div><p className="eyebrow">FIND YOUR NEXT VYBE</p><h1>Explore <span>the world.</span></h1><p>{gallery.length} sample photos · creators and inspiration</p></div><div className="hero-art"><Compass size={50} /></div></section>
            <label className="explore-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search names, captions or categories..." /></label>
            <div className="category-row">{categories.map(item => <button key={item} className={`category-chip ${category === item ? 'selected' : ''}`} onClick={() => { setCategory(item); setVisibleCount(24) }}>{item}</button>)}</div>
            <div className="gallery-grid">{filteredGallery.slice(0, visibleCount).map(photo => <button className="gallery-photo" key={photo.id} onClick={() => notify(`${photo.user}: ${photo.caption}`)}><img src={photo.image} alt={`${photo.category} photo by ${photo.user}`} loading="lazy" /><span className="gallery-overlay"><strong>{photo.user}</strong><span><Heart size={12} /> {photo.likes}</span></span></button>)}</div>
            {filteredGallery.length === 0 && <p className="empty-state">No matching photos. Try another search or category.</p>}
            {visibleCount < filteredGallery.length && <button className="primary-button load-more" onClick={() => setVisibleCount(count => count + 24)}>Load more photos</button>}
            <p className="disclaimer">Sample photos are hosted by Unsplash. These are demo profiles, not real registered users.</p>
          </section>}

          {page === 'Create' && <><PageHeader eyebrow="MAKE SOMETHING" title="Create a post" detail="Share a photo or a thought with your VYBE community." /><CreateForm caption={caption} setCaption={setCaption} image={postImage} onImage={e => setPhotoFromInput(e, setPostImage)} onSubmit={publishPost} /></>}

          {page === 'Stories' && <><PageHeader eyebrow="MOMENTS THAT MOVE" title="Create a Story" detail="Choose a photo, add a caption and select a music mood." /><section className="panel story-composer"><form onSubmit={publishStory}><label className="file-drop"><ImagePlus size={27} /><strong>{storyImage ? 'Photo selected' : 'Choose a Story photo'}</strong><span>Pick an image from your device</span><input type="file" accept="image/*" onChange={e => setPhotoFromInput(e, setStoryImage)} /></label>{storyImage && <img className="upload-preview" src={storyImage} alt="Story preview" />}<input className="field-input" value={storyCaption} onChange={e => setStoryCaption(e.target.value)} placeholder="Add a caption (optional)" /><div className="music-row"><Music2 size={18} /><label htmlFor="story-music-page">Music mood</label><select id="story-music-page" value={music} onChange={e => setMusic(e.target.value)}>{musicOptions.map(option => <option key={option}>{option}</option>)}</select></div><button className="primary-button publish-button"><Plus size={17} /> Publish Story</button></form></section><div className="section-heading feed-heading"><div><h2>Recent Stories</h2><p>Tap a circle to preview</p></div></div><div className="story-library">{stories.map(story => <button className="story-library-item" key={story.id} onClick={() => setStoryViewer(story)}><img src={story.image} alt="" /><span><strong>{story.name}</strong><small>{story.caption || story.music || 'Story'} · demo</small></span><ChevronRight size={17} /></button>)}</div></>}

          {page === 'Snaps' && <><PageHeader eyebrow="IN THE MOMENT" title="Send a Snap" detail="Choose a photo for this local Snap demo." /><section className="panel story-composer"><label className="file-drop"><Camera size={28} /><strong>{snapImage ? 'Snap photo selected' : 'Choose a photo'}</strong><span>Pick a picture from your device</span><input type="file" accept="image/*" onChange={e => setPhotoFromInput(e, setSnapImage)} /></label>{snapImage && <img className="upload-preview" src={snapImage} alt="Snap preview" />}<div className="field-row"><label htmlFor="snap-recipient">Send to</label><select id="snap-recipient" className="field-input"><option>Vishal</option><option>Sahil</option>{names.filter(n => !['Bikram','Vishal','Sahil'].includes(n)).map(n => <option key={n}>{n}</option>)}</select></div><button className="primary-button publish-button" onClick={() => notify(snapImage ? 'Snap demo prepared. Private delivery needs accounts and storage.' : 'Choose a photo first.')}><Send size={16} /> Send Snap</button></section><p className="disclaimer">Private and disappearing delivery is not active in this local demo.</p></>}

          {page === 'Messages' && <><PageHeader eyebrow="STAY CONNECTED" title="Messages" detail="A local chat interface preview for VYBE." /><section className="panel chat-panel"><aside className="chat-people">{['Vishal','Sahil', ...names.filter(n => !['Bikram','Vishal','Sahil'].includes(n)).slice(0, 8)].map(person => <button key={person} className={messagePerson === person ? 'chat-person active-chat-person' : 'chat-person'} onClick={() => setMessagePerson(person)}><Avatar name={person} /><span><strong>{person}</strong><small>Demo conversation</small></span></button>)}</aside><div className="chat-window"><div className="chat-window-heading"><Avatar name={messagePerson} /><div><strong>{messagePerson}</strong><small>Local demo chat</small></div></div><div className="chat-bubbles"><div className="chat-system-note">Messages here are only stored in this browser session.</div>{(messages[messagePerson] || []).map((message, i) => <p className="chat-bubble own-bubble" key={`${message}-${i}`}>{message}</p>)}</div><form className="chat-compose" onSubmit={sendMessage}><input value={messageText} onChange={e => setMessageText(e.target.value)} placeholder={`Message ${messagePerson}...`} /><button className="primary-button" aria-label="Send message"><Send size={17} /></button></form></div></section></>}

          {page === 'Calls' && <><PageHeader eyebrow="STAY CONNECTED" title="Call your people" detail="Choose a demo contact to preview the call screen." /><div className="call-list">{names.filter(name => name !== 'Bikram').map(name => <article className="panel call-person" key={name}><Avatar name={name} /><div className="call-person-info"><strong>{name}</strong><small>VYBE demo contact</small></div><button className="outline-button" onClick={() => setSelectedCall({ name, type: 'Voice' })}><Phone size={16} /> Voice</button><button className="primary-button" onClick={() => setSelectedCall({ name, type: 'Video' })}><Video size={16} /> Video</button></article>)}</div><p className="disclaimer">Call screen preview only. Real-time calls require a signaling/calling service and HTTPS.</p></>}

          {page === 'Profile' && <><PageHeader eyebrow="YOUR CORNER OF VYBE" title="Bikram" detail="Your local demo profile." /><section className="panel profile-detail"><div className="profile-detail-cover" /><Avatar name="Bikram" large /><h2>Bikram</h2><p className="muted">@bikram.on.vybe</p><p>Sharing the moments that matter.</p><div className="profile-detail-stats"><span><strong>{posts.filter(p => p.user === 'Bikram').length}</strong>Posts</span><span><strong>0</strong>Followers</span><span><strong>0</strong>Following</span></div><button className="primary-button" onClick={() => go('Create')}><Plus size={16} /> Create a post</button></section></>}
        </section>

        <aside className="rightbar"><section className="profile-card"><div className="profile-cover" /><Avatar name="Bikram" large /><h3>Bikram</h3><p>@bikram.on.vybe</p><div className="profile-stats"><span><strong>{posts.filter(p => p.user === 'Bikram').length}</strong>Posts</span><span><strong>0</strong>Followers</span><span><strong>0</strong>Following</span></div><button className="outline-button" onClick={() => go('Profile')}>View profile</button></section><section className="suggest-card"><p className="eyebrow">DISCOVER</p><h3>Find your people</h3><p>Explore demo creators and photography from around the world.</p><button className="text-button" onClick={() => go('Explore')}>Explore photos <ChevronRight size={15} /></button></section><p className="footer-note">VYBE · Your world, your way.</p></aside>
      </div>

      <nav className="mobile-nav">{[{ label:'Home', icon:Home },{ label:'Explore', icon:Compass },{ label:'Create', icon:Plus },{ label:'Messages', icon:MessageCircle },{ label:'Profile', icon:UserRound }].map(({label, icon:Icon}) => <button key={label} className={page === label ? 'mobile-active' : ''} onClick={() => go(label)}><Icon size={20} /><span>{label}</span></button>)}</nav>

      {commentPost !== null && <div className="modal-backdrop" onClick={() => setCommentPost(null)}><section className="comment-modal" onClick={e => e.stopPropagation()}><div className="section-heading"><h2>Comments</h2><button className="icon-button" onClick={() => setCommentPost(null)} aria-label="Close comments"><X size={19} /></button></div><div className="comments-list">{posts.find(p => p.id === commentPost)?.comments.map((comment, i) => <p key={i}><strong>Bikram:</strong> {comment}</p>)}{(posts.find(p => p.id === commentPost)?.comments.length || 0) === 0 && <p className="muted">Be the first to comment.</p>}</div><form className="comment-form" onSubmit={sendComment}><input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Write a comment..." /><button className="primary-button" aria-label="Send comment"><Send size={16} /></button></form></section></div>}

      {storyViewer && <div className="modal-backdrop" onClick={() => setStoryViewer(null)}><section className="story-viewer" onClick={e => e.stopPropagation()}><button className="story-close icon-button" onClick={() => setStoryViewer(null)} aria-label="Close Story"><X size={20} /></button><img src={storyViewer.image} alt={`${storyViewer.name}'s Story`} /><div className="story-viewer-caption"><strong>{storyViewer.name}</strong><span>{storyViewer.caption || 'A moment on VYBE'} · {storyViewer.music || 'Story'}</span></div></section></div>}

      {selectedCall && <div className="modal-backdrop"><section className="call-modal"><button className="story-close icon-button" onClick={() => setSelectedCall(null)} aria-label="End call"><X size={19} /></button><Avatar name={selectedCall.name} large /><p className="call-status">VYBE {selectedCall.type.toLowerCase()} call</p><h2>{selectedCall.name}</h2><p className="muted">This is a demo calling screen. No live audio or video connection has been established.</p><div className="call-controls"><button className="call-control" onClick={() => notify('Microphone control requires live-call integration.')}><Mic size={19} /></button>{selectedCall.type === 'Video' && <button className="call-control" onClick={() => notify('Camera control requires live-call integration.')}><Video size={19} /></button>}<button className="call-end" onClick={() => setSelectedCall(null)}><PhoneOff size={20} /></button></div></section></div>}

      {notice && <button className="toast" onClick={() => setNotice('')}>{notice}<X size={15} /></button>}
    </main>
  )
}

function Avatar({ name, large = false }) {
  return <span className={`avatar ${large ? 'avatar-large' : ''}`} style={{ background: avatarColor(name) }}>{name.slice(0, 1).toUpperCase()}</span>
}

function PageHeader({ eyebrow, title, detail }) {
  return <div className="page-title"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{detail}</p></div>
}

function CreateForm({ caption, setCaption, image, onImage, onSubmit }) {
  return <form className="panel create-card" onSubmit={onSubmit}><div className="create-title"><Avatar name="Bikram" /><strong>Bikram · Share a moment</strong></div><textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="What's happening in your world?" rows="3" />{image && <img className="upload-preview" src={image} alt="Selected post preview" />}<div className="create-bottom"><label className="upload-label"><ImagePlus size={17} /> Add photo<input type="file" accept="image/*" onChange={onImage} hidden /></label><button className="primary-button" type="submit"><Plus size={16} /> Publish post</button></div></form>
}

function PostCard({ post, onLike, onHeart, onShare, onComment }) {
  return <article className="panel post-card"><div className="post-user"><Avatar name={post.user} /><div><strong>{post.user}</strong><small>Shared a moment</small></div><button className="more icon-button" aria-label="Post options"><MoreHorizontal size={21} /></button></div>{post.image ? <img className="post-image" src={post.image} alt={post.caption || 'Shared photo'} onDoubleClick={() => onHeart(post.id)} /> : <div className="text-post">{post.caption}</div>}{post.caption && post.image && <p className="post-caption">{post.caption}</p>}<div className="post-actions"><button className={`action ${post.liked ? 'liked' : ''}`} onClick={() => onLike(post.id)}><Heart size={19} fill={post.liked ? 'currentColor' : 'none'} /> <span>Like</span></button><button className="heart-pair" aria-label="Heart emoji like" title="Heart like" onClick={() => onHeart(post.id)}>❤️❤️</button><button className="action" onClick={onComment}><MessageCircle size={18} /><span>Comment</span></button><button className="action" onClick={() => onShare(post)}><Share2 size={18} /><span>Share</span></button></div><p className="like-count">{post.likes.toLocaleString()} likes · {post.comments.length} comments</p></article>
}
