DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
if [ ! -f $DIR/required.txt ]; then
    echo "File not found!"
    exit -1
else
    echo "File found!"
fi
exit 1