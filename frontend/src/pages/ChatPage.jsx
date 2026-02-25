import { useChatStore } from '../store/useChatStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ContactList from '../components/contactList';
import ChatsList from '../components/ChatsList';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import NoConversationPlaceHolder from '../components/NoConversationPlaceHolder';
import ProfileHeader from '../components/ProfileHeader';


function ChatPage() {
  const {activeTab , selectedUser} = useChatStore();
  return (
    <div className='relative w-full max-w-6xl h-[800px] '>
      
      <BorderAnimatedContainer>

          <div className="w-80 bg-[#0F172B]/50  backdrop-blur-sm flex flex-col">
                <ProfileHeader />
                <ActiveTabSwitch />

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {activeTab === "chats" ? <ChatsList /> : < ContactList />}
                </div>

          </div>

          <div className="flex-1 flex flex-col bg-[#0F172B] backdrop-blur-sm">
            {selectedUser ? <ChatContainer/> : <NoConversationPlaceHolder />}
          </div>

      </BorderAnimatedContainer>

    </div>
  )
}

export default ChatPage
