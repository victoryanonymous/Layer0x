//Longest Palindromic SubString..
import java.util.*;
class HelloWorld {
    private static String longestPalindrome(String s) {
        int start=0, end=0;
        for(int i=0;i<s.length();i++) {
            int left=i, right=i;
            char ch=s.charAt(i);
            while(left>=0 && s.charAt(left)==ch) left--;
            while(right<s.length() && s.charAt(right)==ch) right++;
            while(left>=0 && right<s.length()) {
                if(s.charAt(left)!=s.charAt(right))
                    break;
                left--;
                right++;
            }
            left+=1;
            if(end-start<right-left) {
                start=left;
                end=right;
            }
        }
        return s.substring(start, end);
    }
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int t=sc.nextInt();
        while(t-- >0) {
            String str=sc.next();
            System.out.println("Longest Palindromic SubString is "+longestPalindrome(str));   
        }
    }    
}
//Time Complexity is O(n^2)..
//With Test Cases TC is O(t*n^2)..
