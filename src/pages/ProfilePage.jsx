import React from 'react';
import { useAuth } from '../contexts/AuthContext';


export default function ProfilePage(){
const { user } = useAuth();
if (!user) return <div>Please login.</div>;
return (
<div>
<h2>Profile</h2>
<pre>{JSON.stringify(user, null, 2)}</pre>
</div>
);
}