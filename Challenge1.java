//KADANE'S Algorithm..
import java.util.*;
class HelloWorld {
    private static int kadanesAlgo(int[] arr) {
        int n = arr.length;
        int max = Integer.MIN_VALUE, sum = 0;
        for(int i=0;i<n;i++){
            sum += arr[i];
            max = Math.max(sum,max);
            if(sum<0) 
                sum = 0;
        }
        return max;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t=sc.nextInt();    //no.of task cases..
        while(t-- >0) {
            int n=sc.nextInt();     //size of array..
            int[] arr = new int[n];
            for(int i=0;i<n;i++)
                arr[i]=sc.nextInt();
            System.out.println("Maximum SubArray sum is "+kadanesAlgo(arr));   
        }
    }
}

// Time Complexity is O(n) for Algorithm..
// With test Cases TC is O(t*n)..